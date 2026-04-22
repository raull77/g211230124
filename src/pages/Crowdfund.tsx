import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { campaigns } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Crowdfund = () => {
  const { isConnected, connect } = useWallet();
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const handleContribute = (campaignId: string, campaignTitle: string) => {
    const amount = amounts[campaignId];
    if (!amount || Number(amount) <= 0) {
      toast.error("Masukkan jumlah ETH yang valid");
      return;
    }
    if (!isConnected) {
      connect();
      return;
    }
    // Simulasi: di produksi -> contract.contribute(id, { value: parseEther(amount) })
    toast.success("Transaksi dikirim ke blockchain", {
      description: `${amount} ETH untuk "${campaignTitle}" sedang dikonfirmasi.`,
    });
    setAmounts((s) => ({ ...s, [campaignId]: "" }));
  };

  return (
    <PageShell>
      <section className="container py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">// Capital Pools</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight chrome-text mb-4">
              Crowdfunding Transparan.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Smart contract <span className="text-foreground font-semibold">all-or-nothing</span>: dana hanya
              dicairkan jika target tercapai sebelum deadline. Jika gagal, refund 100% otomatis.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="violet" size="lg" className="rounded-xl">Buat Kampanye</Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10">
              <DialogHeader>
                <DialogTitle className="font-display chrome-text">Buat Kampanye Baru</DialogTitle>
                <DialogDescription>
                  Isi detail proposal. Smart contract akan dibuat di blockchain dan tidak bisa diubah.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Kampanye sedang dideploy ke smart contract");
                }}
                className="space-y-4 pt-2"
              >
                <Input placeholder="Judul kampanye" className="glass border-white/10" required />
                <Input type="number" step="0.01" placeholder="Target (ETH)" className="glass border-white/10 mono" required />
                <Input type="number" placeholder="Durasi (hari)" className="glass border-white/10 mono" required />
                <Button type="submit" variant="liquid" className="w-full rounded-lg">Deploy Smart Contract</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((c) => {
            const progress = Math.min(100, (c.raised / c.goal) * 100);
            const done = c.status === "Tercapai";
            return (
              <article key={c.id} className="iridescent-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                  <div className="sm:col-span-2 aspect-square sm:aspect-auto relative bg-muted">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        done ? "text-success" : "text-secondary"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="sm:col-span-3 p-6 flex flex-col">
                    <p className="text-[10px] mono uppercase tracking-widest text-muted-foreground mb-2">
                      {c.umkm} • {c.region}
                    </p>
                    <h3 className="font-display text-xl font-bold mb-3 text-balance">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{c.description}</p>

                    <div className="space-y-3 mb-5">
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
                      <div className="flex justify-between text-xs text-muted-foreground mono">
                        <span>{c.backers} backers</span>
                        <span>{c.daysLeft} hari lagi</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        placeholder="0.05"
                        value={amounts[c.id] ?? ""}
                        onChange={(e) => setAmounts((s) => ({ ...s, [c.id]: e.target.value }))}
                        className="glass border-white/10 rounded-lg mono"
                        aria-label={`Jumlah ETH untuk ${c.title}`}
                        disabled={done}
                      />
                      <Button
                        variant="liquid"
                        className="rounded-lg whitespace-nowrap"
                        onClick={() => handleContribute(c.id, c.title)}
                        disabled={done}
                      >
                        Dukung
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-20 glass rounded-3xl p-10 lg:p-12">
          <h2 className="font-display text-3xl font-bold mb-8 chrome-text">Cara Kerja Smart Contract</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Kontribusi Terkunci", desc: "Setiap donasi terkunci dalam smart contract — bukan rekening pribadi." },
              { step: "02", title: "All-or-Nothing", desc: "Jika target tercapai sebelum deadline, UMKM dapat menarik dana. Jika tidak, dana dikembalikan." },
              { step: "03", title: "Transparan On-Chain", desc: "Setiap transaksi terlihat publik di blockchain, dapat diverifikasi siapapun." },
            ].map((s) => (
              <div key={s.step}>
                <p className="font-display text-5xl font-bold chrome-text mb-3">{s.step}</p>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Crowdfund;
