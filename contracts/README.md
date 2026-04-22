# Nusantara.Protocol — Smart Contracts

Folder ini berisi tiga smart contract Solidity untuk platform UMKM Web3:

| File | Fungsi |
|------|--------|
| `UMKMProduct.sol` | NFT (ERC-721 sederhana) untuk sertifikat keaslian produk UMKM |
| `UMKMCrowdfund.sol` | Crowdfunding "all-or-nothing" — dana hanya cair jika target tercapai |
| `NusantaraToken.sol` | ERC-20 token untuk sistem loyalty & reward (NUSAN) |

> ⚠️ **Catatan**: Implementasi ini disederhanakan untuk tujuan edukasi. Untuk produksi,
> gunakan library [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) yang sudah teraudit.

---

## 1. Persiapan Tooling (Hardhat)

```bash
# Buat project hardhat baru di luar repo ini, atau setup di root
mkdir hardhat-deploy && cd hardhat-deploy
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
npx hardhat init   # pilih "Create a JavaScript project"
```

Salin file `.sol` dari folder `contracts/` di repo ini ke folder `contracts/` Hardhat.

---

## 2. Konfigurasi Network (`hardhat.config.js`)

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,        // dari Alchemy/Infura
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,         // https://rpc-mumbai.maticvigil.com
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

Buat file `.env`:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=YOUR_TESTNET_WALLET_PRIVATE_KEY   # JANGAN PERNAH commit!
```

---

## 3. Skrip Deploy (`scripts/deploy.js`)

```js
const hre = require("hardhat");

async function main() {
  // 1. Deploy NFT certificate
  const Product = await hre.ethers.getContractFactory("UMKMProduct");
  const product = await Product.deploy();
  await product.waitForDeployment();
  console.log("UMKMProduct:", await product.getAddress());

  // 2. Deploy crowdfunding
  const Crowdfund = await hre.ethers.getContractFactory("UMKMCrowdfund");
  const crowdfund = await Crowdfund.deploy();
  await crowdfund.waitForDeployment();
  console.log("UMKMCrowdfund:", await crowdfund.getAddress());

  // 3. Deploy loyalty token
  const Token = await hre.ethers.getContractFactory("NusantaraToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("NusantaraToken:", await token.getAddress());
}

main().catch((err) => { console.error(err); process.exit(1); });
```

Jalankan:
```bash
# Sepolia (Ethereum testnet)
npx hardhat run scripts/deploy.js --network sepolia

# Mumbai (Polygon testnet)
npx hardhat run scripts/deploy.js --network mumbai
```

Faucet testnet:
- Sepolia: https://sepoliafaucet.com
- Mumbai: https://faucet.polygon.technology

---

## 4. Hubungkan ke Frontend

Setelah deploy, salin alamat kontrak ke file `.env` aplikasi React:
```
VITE_PRODUCT_CONTRACT=0x...
VITE_CROWDFUND_CONTRACT=0x...
VITE_TOKEN_CONTRACT=0x...
```

Lalu instal `ethers.js` di proyek React dan buat helper di `src/lib/contracts.ts`:

```bash
npm install ethers
```

```ts
import { ethers } from "ethers";
import productAbi from "./abi/UMKMProduct.json";

export async function getProductContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(import.meta.env.VITE_PRODUCT_CONTRACT, productAbi, signer);
}
```

---

## 5. IPFS untuk Metadata & Gambar

Gunakan layanan seperti [Pinata](https://pinata.cloud) atau [web3.storage](https://web3.storage):

```ts
const upload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  });
  const { IpfsHash } = await res.json();
  return `ipfs://${IpfsHash}`;
};
```

Format metadata NFT (ERC-721 standard):
```json
{
  "name": "Batik Tulis Sogan #0829",
  "description": "Batik tulis tangan dari Solo...",
  "image": "ipfs://Qm.../batik.jpg",
  "attributes": [
    { "trait_type": "Region", "value": "Solo" },
    { "trait_type": "Material", "value": "Sutra" }
  ]
}
```
