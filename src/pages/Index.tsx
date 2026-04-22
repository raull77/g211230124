import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { ProductCard } from "@/components/ProductCard";
import { products, campaigns } from "@/lib/mockData";
import { ArrowRight, ShieldCheck, Coins, HeartHandshake, Gem, ChevronRight } from "lucide-react";
import heroChrome from "@/assets/hero-chrome.jpg";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShieldCheck,
    title: "Digital Pedigree",
    desc: "Mint sertifikat NFT untuk batik, kerajinan, kopi. Lawan pemalsuan global dengan verifikasi blockchain on-chain.",
    accent: "primary",
  },
  {
    icon: HeartHandshake,
    title: "Fractional Capital",
    desc: "Crowdfunding lewat smart contract all-or-nothing. Dana hanya cair jika target tercapai, otomatis refund jika gagal.",
    accent: "secondary",
  },
  {
    icon: Gem,
    title: "Archipelago Yield",
    desc: "Loyalty token $NUSAN otomatis terdistribusi ke pelanggan setia. Tukar diskon, akses VIP, atau drop NFT terbatas.",
    accent: "primary",
  },
];

const stats = [
  { label: "Total Value Locked", value: "$14.8M" },
  { label: "UMKM Aktif", value: "1,847" },
  { label: "NFT Diterbitkan", value: "12,409" },
  { label: "Transaksi On-Chain", value: "84,210" },
];

const Index = () => {
  return (
    <PageShell withTopPadding={false}>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden pt-40 pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none"
        />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 animate-float-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-bold tracking-widest text-primary uppercase mb-8">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Tokenizing the Archipelago
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.95] mb-8 text-balance">
                <span className="chrome-text">LIQUID ASSETS</span>
                <br />
                <span className="text-foreground">FOR EVERY</span>{" "}
                <span className="text-primary italic font-light">UMKM.</span>
              </h1>

              <p className="max-w-[55ch] text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                Bawa bisnis tradisional Anda ke ledger digital global. Sertifikasi keaslian karya,
                buka modal pintar, dan bangun loyalitas global di protokol Web3 pertama untuk
                kreator Indonesia.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <ConnectWalletButton />
                <Button asChild variant="glass" size="xl" className="rounded-xl">
                  <Link to="/marketplace">
                    Jelajahi Marketplace <ArrowRight />
                  </Link>
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">{s.label}</p>
                    <p className="font-display text-2xl font-bold mono chrome-text">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-3xl overflow-hidden iridescent-border relative group">
                <img
                  src={heroChrome}
                  alt="Liquid chrome circuits representing Web3 infrastructure for Indonesian UMKM"
                  width={1280}
                  height={1280}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Floating valuation card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 glass rounded-2xl">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Live Valuation</p>
                      <p className="text-2xl font-bold mono chrome-text">42.85 ETH</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-primary uppercase tracking-widest mb-1">24h Yield</p>
                      <p className="text-lg font-bold mono text-primary">+12.4%</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary h-full w-3/4 animate-shimmer" style={{
                      backgroundSize: "200% 100%",
                    }} />
                  </div>
                </div>
              </div>

              {/* Floating chip */}
              <div className="hidden md:flex absolute -left-6 top-12 px-4 py-2.5 glass rounded-full items-center gap-2 animate-float-up" style={{ animationDelay: "0.3s" }}>
                <ShieldCheck className="size-4 text-primary" />
                <span className="text-xs font-semibold">NFT Verified</span>
              </div>
              <div className="hidden md:flex absolute -right-4 bottom-32 px-4 py-2.5 glass rounded-full items-center gap-2 animate-float-up" style={{ animationDelay: "0.5s" }}>
                <Coins className="size-4 text-secondary" />
                <span className="text-xs font-semibold mono">+125 NUSAN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">// Three Pillars</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight chrome-text">
              Infrastruktur untuk legacy digital UMKM Indonesia.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {features.map((f) => {
              const Icon = f.icon;
              const isPrimary = f.accent === "primary";
              return (
                <div key={f.title} className="p-10 lg:p-12 glass group transition-all hover:bg-white/[0.04]">
                  <div
                    className={`size-12 rounded-xl flex items-center justify-center mb-8 ${
                      isPrimary ? "bg-primary/10 border border-primary/20" : "bg-secondary/10 border border-secondary/20"
                    }`}
                  >
                    <Icon className={`size-5 ${isPrimary ? "text-primary" : "text-secondary"}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 chrome-text">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== MARKETPLACE PREVIEW ============== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">// Live Nodes</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight chrome-text">Karya Tersertifikasi.</h2>
            </div>
            <Link
              to="/marketplace"
              className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary"
            >
              Lihat Marketplace
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== CROWDFUND PREVIEW ============== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">// Active Capital Pools</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight chrome-text">
                Modal global, dampak lokal.
              </h2>
            </div>
            <Link
              to="/crowdfund"
              className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-secondary"
            >
              Semua Kampanye
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((c) => {
              const progress = Math.min(100, (c.raised / c.goal) * 100);
              return (
                <Link
                  key={c.id}
                  to="/crowdfund"
                  className="iridescent-border rounded-2xl overflow-hidden group block transition-transform hover:-translate-y-1 duration-500"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        c.status === "Tercapai" ? "text-success" : "text-secondary"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] mono uppercase tracking-widest text-muted-foreground mb-2">{c.umkm} • {c.region}</p>
                    <h3 className="font-display text-lg font-bold mb-4 text-balance">{c.title}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="mono text-primary font-semibold">{c.raised} ETH</span>
                        <span className="text-muted-foreground mono">target {c.goal} ETH</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mono pt-1">
                        <span>{c.backers} backers</span>
                        <span>{c.daysLeft} hari lagi</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== CTA BAND ============== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="iridescent-border rounded-3xl p-10 lg:p-20 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" aria-hidden="true" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-6 chrome-text text-balance">
                Siap menjadi node berikutnya?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 text-pretty">
                Hubungkan MetaMask, daftarkan UMKM Anda, mint sertifikat pertama hari ini.
                Tanpa email, tanpa password — cukup wallet.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ConnectWalletButton />
                <Button asChild variant="glass" size="xl" className="rounded-xl">
                  <Link to="/dashboard">
                    Buka Dashboard UMKM <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
