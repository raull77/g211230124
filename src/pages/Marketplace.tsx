import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, ProductCategory } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const categories: (ProductCategory | "Semua")[] = ["Semua", "Tekstil", "Kuliner", "Kerajinan", "Pertanian"];

const Marketplace = () => {
  const [category, setCategory] = useState<(typeof categories)[number]>("Semua");
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchQ =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.artisan.toLowerCase().includes(query.toLowerCase()) ||
      p.region.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <PageShell>
      <section className="container py-12">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">// Marketplace</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight chrome-text mb-4">
            Pasar Nusantara On-Chain.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Setiap produk memiliki sertifikat NFT yang dapat diverifikasi. Beli langsung dari perajin
            menggunakan crypto, gambar dan metadata tersimpan di IPFS.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk, perajin, atau daerah..."
              className="pl-11 h-12 glass border-white/10 rounded-full"
              aria-label="Cari produk"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === category ? "liquid" : "glass"}
                onClick={() => setCategory(cat)}
                className="rounded-full whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
            Tidak ada produk yang cocok. Coba kata kunci lain.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Marketplace;
