// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title UMKMCrowdfund
 * @notice Crowdfunding berbasis smart contract untuk UMKM.
 *         Dana hanya bisa dicairkan jika target tercapai sebelum deadline.
 *         Jika gagal, donor dapat klaim refund 100%.
 */
contract UMKMCrowdfund {
    struct Campaign {
        address creator;       // UMKM yang membuat kampanye
        uint256 goal;          // Target pendanaan (wei)
        uint256 deadline;      // Timestamp Unix
        uint256 raised;        // Total terkumpul
        bool finalized;        // Sudah dicairkan/di-refund?
        string metadataURI;    // IPFS metadata (judul, deskripsi, gambar)
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    // campaignId => donor => jumlah kontribusi
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event CampaignCreated(uint256 indexed id, address indexed creator, uint256 goal, uint256 deadline);
    event Contributed(uint256 indexed id, address indexed donor, uint256 amount);
    event Withdrawn(uint256 indexed id, address indexed creator, uint256 amount);
    event Refunded(uint256 indexed id, address indexed donor, uint256 amount);

    /**
     * @notice Buat kampanye crowdfunding baru.
     * @param goal Target dalam wei.
     * @param duration Durasi kampanye dalam detik.
     * @param metadataURI IPFS hash untuk detail kampanye.
     */
    function createCampaign(uint256 goal, uint256 duration, string memory metadataURI) external returns (uint256) {
        require(goal > 0, "Goal must be > 0");
        require(duration > 0, "Duration must be > 0");

        uint256 id = campaignCount++;
        campaigns[id] = Campaign({
            creator: msg.sender,
            goal: goal,
            deadline: block.timestamp + duration,
            raised: 0,
            finalized: false,
            metadataURI: metadataURI
        });

        emit CampaignCreated(id, msg.sender, goal, block.timestamp + duration);
        return id;
    }

    /**
     * @notice Donor berkontribusi pada kampanye. Wajib mengirim ETH.
     */
    function contribute(uint256 id) external payable {
        Campaign storage c = campaigns[id];
        require(c.creator != address(0), "Campaign not found");
        require(block.timestamp < c.deadline, "Campaign ended");
        require(msg.value > 0, "Send ETH");

        c.raised += msg.value;
        contributions[id][msg.sender] += msg.value;
        emit Contributed(id, msg.sender, msg.value);
    }

    /**
     * @notice Pencairan dana hanya jika target tercapai dan deadline lewat.
     */
    function withdraw(uint256 id) external {
        Campaign storage c = campaigns[id];
        require(msg.sender == c.creator, "Not creator");
        require(block.timestamp >= c.deadline, "Campaign still active");
        require(c.raised >= c.goal, "Goal not reached");
        require(!c.finalized, "Already withdrawn");

        c.finalized = true;
        uint256 amount = c.raised;
        (bool sent, ) = payable(c.creator).call{value: amount}("");
        require(sent, "Transfer failed");
        emit Withdrawn(id, c.creator, amount);
    }

    /**
     * @notice Donor klaim refund jika kampanye gagal (target tidak tercapai).
     */
    function refund(uint256 id) external {
        Campaign storage c = campaigns[id];
        require(block.timestamp >= c.deadline, "Campaign still active");
        require(c.raised < c.goal, "Goal reached, no refund");

        uint256 amount = contributions[id][msg.sender];
        require(amount > 0, "No contribution");

        contributions[id][msg.sender] = 0;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Refund failed");
        emit Refunded(id, msg.sender, amount);
    }
}
