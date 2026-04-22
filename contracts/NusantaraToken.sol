// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NusantaraToken (NUSAN)
 * @notice ERC-20 sederhana untuk loyalty / reward.
 *         Customer mendapat NUSAN setiap pembelian; bisa ditukar diskon/akses VIP.
 *         Untuk produksi gunakan OpenZeppelin ERC20.
 */
contract NusantaraToken {
    string public name = "Nusantara Loyalty Token";
    string public symbol = "NUSAN";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public minter; // platform yang berhak mint

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        minter = msg.sender;
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Not minter");
        _;
    }

    /**
     * @notice Mint reward ke pelanggan setelah aksi tertentu (pembelian, review, dsb).
     */
    function mint(address to, uint256 amount) external onlyMinter {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient");
        require(allowance[from][msg.sender] >= amount, "Not allowed");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
