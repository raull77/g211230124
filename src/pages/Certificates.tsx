import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { certificates } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, ExternalLink, Hash } from "lucide-react";
import { toast } from "sonner";

const Certificates = () => {
  const [tokenId, setTokenId] = useState("");

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenId.trim()) {
      toast.error("Masukkan Token ID");
      return;
    }
    const found = certificates.find((c) => c.tokenId.toLowerCase().includes(tokenId.toLowerCase()));
    if (found) {
      toast.success("Sertifikat valid", {
        description: `${found.productName} oleh ${found.issuer} — terverifikasi on-chain.`,
      });
    } else {
      toast.error("Token ID tidak ditemukan", {
        description: "Pastikan format benar (contoh: #0829)",
      });
    }
  };

  return (
    <PageShell>
      <section className="container py-12">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">// Authenticity Layer</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight chrome-text mb-4">
            Sertifikat NFT.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Setiap sertifikat adalah NFT (ERC-721) dengan metadata di IPFS. Tidak bisa diduplikasi,
            tidak bisa dipalsukan.
          </p>
        </div>

        {/* Verifier */}
        <div className="iridescent-border rounded-2xl p-8 mb-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold">Verifikasi Sertifikat</h2>
          </div>
          <form onSubmit={verify} className="flex gap-2">
            <div className="relative flex-1">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Token ID (contoh: #0829)"
                className="pl-11 glass border-white/10 rounded-lg mono"
                aria-label="Token ID untuk verifikasi"
              />
            </div>
            <Button type="submit" variant="liquid" className="rounded-lg">
              <Search /> Verify
            </Button>
          </form>
        </div>

        {/* Recent certificates */}
        <h2 className="font-display text-2xl font-bold mb-6">Sertifikat Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <article key={cert.id} className="glass rounded-2xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-5">
                <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                {cert.verified && (
                  <span className="px-2 py-1 bg-success/10 border border-success/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-success">
                    Verified
                  </span>
                )}
              </div>

              <p className="text-[10px] mono uppercase tracking-widest text-primary mb-2">{cert.tokenId}</p>
              <h3 className="font-display text-lg font-bold mb-1">{cert.productName}</h3>
              <p className="text-sm text-muted-foreground mb-5">by {cert.issuer}</p>

              <dl className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground uppercase tracking-widest">Issued</dt>
                  <dd className="mono text-foreground">{cert.issuedAt}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground uppercase tracking-widest">Tx</dt>
                  <dd className="mono text-foreground truncate">{cert.txHash}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground uppercase tracking-widest">IPFS</dt>
                  <dd className="mono text-foreground truncate">{cert.ipfsHash}</dd>
                </div>
              </dl>

              <Button variant="glass" size="sm" className="w-full mt-5 rounded-lg">
                Lihat di Explorer <ExternalLink className="size-3" />
              </Button>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
};

export default Certificates;
