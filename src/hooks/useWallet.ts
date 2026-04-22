/**
 * useWallet — Hook untuk koneksi MetaMask via window.ethereum
 *
 * Tidak butuh ethers.js: gunakan EIP-1193 provider standar yang sudah disuntik MetaMask.
 * Ini menjaga bundle tetap ringan dan mudah dipahami oleh pemula.
 *
 * Untuk integrasi smart contract penuh, instal ethers.js dan ganti panggilan
 * `request()` di bawah dengan `new ethers.BrowserProvider(window.ethereum)`.
 */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Tipe minimal EIP-1193 provider
type EthereumProvider = {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

// Chain ID yang didukung (hex). Polygon Mumbai = 0x13881, Sepolia = 0xaa36a7
export const SUPPORTED_CHAINS: Record<string, { name: string; symbol: string }> = {
  "0x1": { name: "Ethereum", symbol: "ETH" },
  "0x89": { name: "Polygon", symbol: "MATIC" },
  "0x13881": { name: "Mumbai Testnet", symbol: "MATIC" },
  "0xaa36a7": { name: "Sepolia Testnet", symbol: "ETH" },
};

export interface WalletState {
  address: string | null;
  chainId: string | null;
  isConnecting: boolean;
  isConnected: boolean;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
  });

  // Restore session jika user sudah pernah connect
  useEffect(() => {
    const eth = window.ethereum;
    if (!eth) return;

    const init = async () => {
      try {
        const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
        const chainId = (await eth.request({ method: "eth_chainId" })) as string;
        if (accounts.length > 0) {
          setState({
            address: accounts[0],
            chainId,
            isConnecting: false,
            isConnected: true,
          });
        }
      } catch (err) {
        console.error("Failed to restore wallet session:", err);
      }
    };
    init();

    // Listen perubahan akun & chain
    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        setState({ address: null, chainId: null, isConnecting: false, isConnected: false });
        toast.info("Wallet terputus");
      } else {
        setState((prev) => ({ ...prev, address: accounts[0], isConnected: true }));
      }
    };

    const handleChainChanged = (...args: unknown[]) => {
      const chainId = args[0] as string;
      setState((prev) => ({ ...prev, chainId }));
      toast.info(`Berpindah ke ${SUPPORTED_CHAINS[chainId]?.name ?? chainId}`);
    };

    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener("accountsChanged", handleAccountsChanged);
      eth.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      toast.error("MetaMask tidak ditemukan", {
        description: "Silakan install MetaMask di browser Anda.",
        action: { label: "Install", onClick: () => window.open("https://metamask.io/download/", "_blank") },
      });
      return;
    }

    setState((prev) => ({ ...prev, isConnecting: true }));
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      const chainId = (await window.ethereum.request({ method: "eth_chainId" })) as string;

      setState({
        address: accounts[0],
        chainId,
        isConnecting: false,
        isConnected: true,
      });
      toast.success("Wallet terhubung", {
        description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (err: unknown) {
      const error = err as { code?: number; message?: string };
      setState((prev) => ({ ...prev, isConnecting: false }));
      if (error.code === 4001) {
        toast.error("Permintaan koneksi ditolak");
      } else {
        toast.error("Gagal menghubungkan wallet", { description: error.message });
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({ address: null, chainId: null, isConnecting: false, isConnected: false });
    toast.info("Wallet diputuskan");
  }, []);

  return { ...state, connect, disconnect };
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
