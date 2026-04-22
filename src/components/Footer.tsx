import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 mt-32 bg-background/40">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Protokol Web3 pertama untuk UMKM Indonesia. Tokenisasi karya, akses modal global,
              bangun loyalitas berbasis blockchain.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase glass rounded-full text-primary">
                Powered by Polygon
              </span>
              <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase glass rounded-full text-secondary">
                IPFS Storage
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground mb-5">Protokol</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/crowdfund" className="hover:text-primary transition-colors">Crowdfunding</Link></li>
              <li><Link to="/certificates" className="hover:text-primary transition-colors">Sertifikasi NFT</Link></li>
              <li><Link to="/rewards" className="hover:text-primary transition-colors">Token Reward</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground mb-5">Dokumentasi</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Panduan Deploy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-muted-foreground mono">
            © 2024 NUSANTARA.PROTOCOL — Verified on chain
          </p>
          <div className="flex items-center gap-8 text-xs text-muted-foreground">
            <div>
              <span className="text-[10px] uppercase tracking-widest block">Total Locked</span>
              <span className="mono text-foreground font-semibold">$14,842,204</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest block">Active UMKM</span>
              <span className="mono text-foreground font-semibold">1,847</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
