import { PageShell } from "@/components/PageShell";
import { rewardTiers } from "@/lib/mockData";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Coins, Gift, Sparkles, TrendingUp } from "lucide-react";

const userBalance = 743; // mock — di produksi: token.balanceOf(address)

const Rewards = () => {
  const { isConnected, connect } = useWallet();
  const currentTier = rewardTiers.find((t) => userBalance >= t.min && userBalance <= t.max) ?? rewardTiers[0];
  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1];
  const progress = nextTier ? ((userBalance - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <PageShell>
      <section className="container py-12">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4">// Loyalty Layer</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight chrome-text mb-4">
            $NUSAN Rewards.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Token ERC-20 sebagai bukti loyalitas. Otomatis terkirim ke wallet setiap pembelian,
            review, atau dukungan crowdfunding.
          </p>
        </div>

        {/* User balance card */}
        <div className="iridescent-border rounded-3xl p-8 lg:p-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" aria-hidden="true" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Coins className="size-5 text-secondary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Saldo Anda</span>
              </div>
              {isConnected ? (
                <>
                  <p className="font-display text-6xl lg:text-7xl font-bold mono chrome-text mb-2">
                    {userBalance.toLocaleString()}
                  </p>
                  <p className="text-secondary font-semibold">$NUSAN</p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">Hubungkan wallet untuk melihat saldo $NUSAN Anda.</p>
                  <Button variant="liquid" onClick={connect} className="rounded-xl">Hubungkan Wallet</Button>
                </>
              )}
            </div>

            {isConnected && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${currentTier.color} text-background`}
                  >
                    Tier: {currentTier.tier}
                  </span>
                  {nextTier && (
                    <span className="text-xs text-muted-foreground mono">
                      {nextTier.min - userBalance} NUSAN lagi → {nextTier.tier}
                    </span>
                  )}
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
                <ul className="space-y-2">
                  {currentTier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <Sparkles className="size-3 text-primary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tiers grid */}
        <h2 className="font-display text-2xl font-bold mb-6">Reward Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {rewardTiers.map((t) => {
            const isCurrent = t.tier === currentTier.tier;
            return (
              <article
                key={t.tier}
                className={`glass rounded-2xl p-6 transition-all ${
                  isCurrent ? "border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]" : ""
                }`}
              >
                <div className={`size-10 rounded-lg bg-gradient-to-br ${t.color} mb-5`} aria-hidden="true" />
                <h3 className="font-display text-xl font-bold mb-1">{t.tier}</h3>
                <p className="text-xs mono text-muted-foreground mb-5">
                  {t.min.toLocaleString()}+ NUSAN
                </p>
                <ul className="space-y-2 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="text-muted-foreground">• {p}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* How to earn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Gift, title: "Beli Produk", reward: "+50 per 0.01 ETH", desc: "Dapatkan NUSAN otomatis setiap pembelian di marketplace." },
            { icon: TrendingUp, title: "Dukung Kampanye", reward: "+100 per kontribusi", desc: "Dukung UMKM via crowdfunding dan dapatkan token tambahan." },
            { icon: Sparkles, title: "Review & Verifikasi", reward: "+25 per review", desc: "Tulis review jujur untuk produk yang sudah Anda beli." },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="glass rounded-2xl p-6">
                <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{c.title}</h3>
                <p className="text-xs mono text-secondary mb-3">{c.reward}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default Rewards;
