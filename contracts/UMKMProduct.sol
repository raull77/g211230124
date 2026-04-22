// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title UMKMProduct
 * @notice ERC-721 NFT untuk sertifikat keaslian produk UMKM.
 *         Setiap produk memiliki tokenURI yang menunjuk ke metadata di IPFS.
 *
 *         Untuk demo edukasi — gunakan implementasi OpenZeppelin di produksi:
 *         `import "@openzeppelin/contracts/token/ERC721/ERC721.sol";`
 */
contract UMKMProduct {
    string public name = "Nusantara Product Certificate";
    string public symbol = "NUSAN-CERT";

    uint256 private _tokenIdCounter;
    address public owner;

    // tokenId => owner address
    mapping(uint256 => address) private _owners;
    // tokenId => metadata URI (IPFS hash)
    mapping(uint256 => string) private _tokenURIs;
    // tokenId => UMKM yang menerbitkan
    mapping(uint256 => address) public issuer;
    // tokenId => apakah terverifikasi platform
    mapping(uint256 => bool) public verified;

    event Minted(uint256 indexed tokenId, address indexed issuer, string tokenURI);
    event Verified(uint256 indexed tokenId, bool status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Mint sertifikat NFT baru untuk produk UMKM.
     * @param to Penerima NFT (biasanya UMKM itu sendiri).
     * @param uri IPFS URI yang berisi metadata (gambar, deskripsi, atribut).
     */
    function mintCertificate(address to, string memory uri) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _owners[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        issuer[tokenId] = msg.sender;
        emit Minted(tokenId, msg.sender, uri);
        return tokenId;
    }

    /**
     * @notice Verifikasi sertifikat oleh platform (mencegah pemalsuan).
     */
    function setVerified(uint256 tokenId, bool status) external onlyOwner {
        require(_owners[tokenId] != address(0), "Token does not exist");
        verified[tokenId] = status;
        emit Verified(tokenId, status);
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "Token does not exist");
        return tokenOwner;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}
