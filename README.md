# Nusantara.Protocol

Platform Web3 untuk memberdayakan UMKM Indonesia melalui blockchain.
Sertifikasi NFT, marketplace crypto, crowdfunding via smart contract, dan loyalty token.

## Fitur

- 🔐 **Login MetaMask** — tanpa email/password, identitas via wallet
- 🛒 **Marketplace** — jual-beli produk UMKM dengan crypto
- 🪪 **Sertifikat NFT** — bukti keaslian yang tidak bisa dipalsukan (ERC-721)
- 💰 **Crowdfunding** — smart contract all-or-nothing, dana cair hanya jika target tercapai
- 🎁 **Loyalty Token (NUSAN)** — reward ERC-20 untuk pelanggan setia
- 📦 **IPFS Storage** — gambar produk & metadata terdesentralisasi

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Web3**: MetaMask via EIP-1193 (siap upgrade ke ethers.js)
- **Smart Contracts**: Solidity 0.8.20 (Sepolia/Mumbai testnet ready)
- **Storage**: IPFS (Pinata)

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:8080

## Deploy Smart Contracts ke Testnet

Lihat panduan lengkap di [`contracts/README.md`](./contracts/README.md):
- Setup Hardhat
- Deploy ke Sepolia (Ethereum) atau Mumbai (Polygon)
- Hubungkan alamat kontrak ke frontend via `.env`
- Upload metadata & gambar ke IPFS (Pinata)
