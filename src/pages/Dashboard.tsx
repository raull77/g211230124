import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWallet, shortenAddress } from "@/hooks/useWallet";
import { products } from "@/lib/mockData";
import { toast } from "sonner";
import { Plus, Package, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

const Dashboard = () => {
  const { isConnected, address, connect } = useWallet();
  const [form, setForm] = useState({ name: "", price: "", category: "Tekstil", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Lengkapi nama produk dan harga");
      return;
    }
    if (!isConnected) {
      toast.error("Hubungkan wallet terlebih dahulu");
      return;
    }
    setSubmitting(true);
    // Simulasi: di produksi, panggil contract.mintCertificate(uri) lalu upload metadata ke IPFS
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Produk diajukan ke blockchain", {
        description: `Sertifikat NFT untuk "${form.name}" sedang di-mint. Tx pending konfirmasi.`,
      });
      setForm({ name: "", price: "", category: "Tekstil", description: "" });
    }, 1500);
  };

  if (!isConnected) {
    return (
      <PageShell>
        <section className="container py-32">
          <div className="max-w-md mx-auto text-center glass rounded-3xl p-12">
            <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Wallet className="size-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4 chrome-text">Wallet Diperlukan</h1>
            <p className="text-muted-foreground mb-8">
              Dashboard UMKM hanya bisa diakses dengan wallet terhubung. Identitas Anda dijamin oleh
              tanda tangan kriptografi MetaMask.
            </p>
            <Button variant="liquid" size="xl" onClick={connect} className="rounded-xl w-full">
              <Wallet />
              Hubungkan MetaMask
            </Button>
          </div>
        </section>
      </PageShell>
    );
  }

  // Filter sebagai "produk milik UMKM" — di produksi: query event Minted dengan issuer=address
  const myProducts = products.slice(0, 2);

  const stats = [
    { icon: Package, label: "Produk Terdaftar", value: "12", accent: "primary" },
    { icon: ShieldCheck, label: "NFT Diterbitkan", value: "47", accent: "secondary" },
    { icon: TrendingUp, label: "Total Penjualan", value: "3.42 ETH", accent: "primary" },
  ];

  return (
    <PageShell>
      <section className="container py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">// UMKM Dashboard</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight chrome-text mb-2">
              Selamat datang, Perajin.
            </h1>
            <p className="text-muted-foreground mono text-sm">
              Operating as <span className="text-foreground">{address && shortenAddress(address)}</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {stats.map((s) => {
            const Icon = s.icon;
            const isPrimary = s.accent === "primary";
            return (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div
                  className={`size-10 rounded-lg flex items-center justify-center mb-4 ${
                    isPrimary ? "bg-primary/10 border border-primary/20" : "bg-secondary/10 border border-secondary/20"
                  }`}
                >
                  <Icon className={`size-4 ${isPrimary ? "text-primary" : "text-secondary"}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{s.label}</p>
                <p className="font-display text-3xl font-bold mono chrome-text">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form: Add product */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Plus className="size-4 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold">Tambah Produk</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Nama Produk
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Batik Tulis Klasik"
                    className="glass border-white/10 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Harga (ETH)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="0.085"
                    className="glass border-white/10 rounded-lg mono"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Kategori
                  </Label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-10 px-3 glass border border-white/10 rounded-lg text-sm bg-background/50"
                  >
                    <option value="Tekstil">Tekstil</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Pertanian">Pertanian</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="desc" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="desc"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Cerita di balik karya..."
                    rows={3}
                    className="glass border-white/10 rounded-lg"
                  />
                </div>
                <Button type="submit" variant="liquid" className="w-full rounded-lg" disabled={submitting}>
                  {submitting ? "Mint NFT..." : "Mint Sertifikat NFT"}
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Gambar akan diupload ke IPFS, lalu sertifikat NFT diterbitkan via smart contract.
                </p>
              </form>
            </div>
          </div>

          {/* My products list */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold mb-6">Produk Saya</h2>
            <div className="space-y-4">
              {myProducts.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-4 flex gap-4 items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="size-20 rounded-xl object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] mono text-primary uppercase tracking-widest">{p.tokenId}</span>
                      {p.certified && <ShieldCheck className="size-3 text-primary" />}
                    </div>
                    <h3 className="font-display font-bold truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono font-bold text-primary">{p.price} ETH</p>
                    <p className="text-xs text-muted-foreground">{p.available} stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Dashboard;
