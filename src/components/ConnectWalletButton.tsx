import { Wallet, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet, shortenAddress, SUPPORTED_CHAINS } from "@/hooks/useWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Tombol primary untuk connect/disconnect MetaMask.
 * Menampilkan dropdown info wallet jika sudah terhubung.
 */
export const ConnectWalletButton = () => {
  const { address, chainId, isConnecting, isConnected, connect, disconnect } = useWallet();

  if (!isConnected) {
    return (
      <Button variant="glass" onClick={connect} disabled={isConnecting} className="rounded-full font-semibold">
        {isConnecting ? (
          <>
            <Loader2 className="animate-spin" />
            Menghubungkan...
          </>
        ) : (
          <>
            <span className="size-2 rounded-full bg-primary animate-pulse-ring" aria-hidden="true" />
            Hubungkan Wallet
          </>
        )}
      </Button>
    );
  }

  const chainName = chainId ? SUPPORTED_CHAINS[chainId]?.name ?? "Unknown Chain" : "—";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="glass" className="rounded-full font-semibold mono">
          <span className="size-2 rounded-full bg-success" aria-hidden="true" />
          {address && shortenAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 glass border-white/10">
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Terhubung ke</p>
          <p className="text-sm font-semibold mt-1">{chainName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Alamat</p>
          <p className="text-xs mono mt-1 break-all">{address}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-destructive cursor-pointer">
          <LogOut className="mr-2 size-4" />
          Putuskan Koneksi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
