/**
 * Mock data untuk demo platform.
 * Pada produksi, data ini akan di-fetch dari smart contract & IPFS.
 */
import productBatik from "@/assets/product-batik.jpg";
import productCoffee from "@/assets/product-coffee.jpg";
import productWood from "@/assets/product-wood.jpg";
import productTenun from "@/assets/product-tenun.jpg";

export type ProductCategory = "Tekstil" | "Kuliner" | "Kerajinan" | "Pertanian";

export interface Product {
  id: string;
  name: string;
  artisan: string;
  region: string;
  category: ProductCategory;
  price: number; // dalam ETH
  available: number;
  image: string;
  certified: boolean;
  tokenId: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Batik Tulis Sogan Klasik",
    artisan: "Griya Batik Solo",
    region: "Solo, Jawa Tengah",
    category: "Tekstil",
    price: 0.085,
    available: 4,
    image: productBatik,
    certified: true,
    tokenId: "#0829",
    description: "Batik tulis tangan dengan pewarna alami dari kayu sogan. Setiap helai unik dan ditandatangani digital di blockchain.",
  },
  {
    id: "p2",
    name: "Kopi Arabika Gayo Single Origin",
    artisan: "Koperasi Tani Gayo Mandiri",
    region: "Aceh Tengah",
    category: "Kuliner",
    price: 0.024,
    available: 12,
    image: productCoffee,
    certified: true,
    tokenId: "#1147",
    description: "Biji kopi arabika dari ketinggian 1500 mdpl. Proses honey, dipetik selektif oleh petani koperasi.",
  },
  {
    id: "p3",
    name: "Patung Garuda Kayu Jati",
    artisan: "Sanggar Jepara Karya",
    region: "Jepara, Jawa Tengah",
    category: "Kerajinan",
    price: 0.215,
    available: 1,
    image: productWood,
    certified: true,
    tokenId: "#0042",
    description: "Patung garuda dipahat tangan dari kayu jati pilihan. Edisi terbatas dengan sertifikat NFT.",
  },
  {
    id: "p4",
    name: "Tenun Ikat Sumba Pewarna Alami",
    artisan: "Rumah Tenun Ina",
    region: "Sumba Timur, NTT",
    category: "Tekstil",
    price: 0.145,
    available: 2,
    image: productTenun,
    certified: true,
    tokenId: "#0518",
    description: "Tenun tradisional Sumba dengan benang katun dan pewarna alami dari mengkudu serta nila.",
  },
];

export interface CrowdfundCampaign {
  id: string;
  title: string;
  umkm: string;
  region: string;
  goal: number; // ETH
  raised: number; // ETH
  backers: number;
  daysLeft: number;
  image: string;
  description: string;
  status: "Aktif" | "Tercapai" | "Selesai";
}

export const campaigns: CrowdfundCampaign[] = [
  {
    id: "c1",
    title: "Ekspansi Workshop Batik Solo",
    umkm: "Griya Batik Solo",
    region: "Solo, Jawa Tengah",
    goal: 12.5,
    raised: 8.2,
    backers: 47,
    daysLeft: 18,
    image: productBatik,
    description: "Pendanaan untuk membuka workshop kedua, melatih 25 perajin baru, dan ekspor ke Eropa.",
    status: "Aktif",
  },
  {
    id: "c2",
    title: "Mesin Roasting Kopi Spesialti",
    umkm: "Koperasi Tani Gayo Mandiri",
    region: "Aceh Tengah",
    goal: 6.0,
    raised: 6.4,
    backers: 89,
    daysLeft: 4,
    image: productCoffee,
    description: "Pengadaan mesin roasting modern untuk meningkatkan kapasitas produksi 3x lipat.",
    status: "Tercapai",
  },
  {
    id: "c3",
    title: "Galeri Digital Tenun Sumba",
    umkm: "Rumah Tenun Ina",
    region: "Sumba Timur, NTT",
    goal: 3.5,
    raised: 1.1,
    backers: 22,
    daysLeft: 26,
    image: productTenun,
    description: "Membangun galeri online dan pelatihan digital untuk 40 penenun perempuan Sumba.",
    status: "Aktif",
  },
];

export interface Certificate {
  id: string;
  productName: string;
  issuer: string;
  tokenId: string;
  issuedAt: string;
  txHash: string;
  ipfsHash: string;
  verified: boolean;
}

export const certificates: Certificate[] = [
  {
    id: "cert1",
    productName: "Batik Tulis Sogan Klasik",
    issuer: "Griya Batik Solo",
    tokenId: "#0829",
    issuedAt: "2024-09-12",
    txHash: "0x4f3e...8a91",
    ipfsHash: "Qm7Y...kT2x",
    verified: true,
  },
  {
    id: "cert2",
    productName: "Patung Garuda Kayu Jati",
    issuer: "Sanggar Jepara Karya",
    tokenId: "#0042",
    issuedAt: "2024-08-28",
    txHash: "0x9b2c...1d77",
    ipfsHash: "Qm3R...nP8y",
    verified: true,
  },
  {
    id: "cert3",
    productName: "Kopi Arabika Gayo",
    issuer: "Koperasi Tani Gayo",
    tokenId: "#1147",
    issuedAt: "2024-10-05",
    txHash: "0x1a8f...4c30",
    ipfsHash: "Qm5W...vH4q",
    verified: true,
  },
];

export const rewardTiers = [
  { tier: "Bronze", min: 0, max: 99, perks: ["Akses marketplace", "Notifikasi produk baru"], color: "from-amber-700 to-amber-900" },
  { tier: "Silver", min: 100, max: 499, perks: ["Diskon 5%", "Early access produk", "Newsletter eksklusif"], color: "from-slate-300 to-slate-500" },
  { tier: "Gold", min: 500, max: 1999, perks: ["Diskon 10%", "Voting komunitas", "Drop NFT terbatas"], color: "from-yellow-400 to-amber-600" },
  { tier: "Diamond", min: 2000, max: Infinity, perks: ["Diskon 20%", "Akses VIP event", "Edisi 1-of-1", "Direct line ke perajin"], color: "from-cyan-400 to-violet-500" },
];
