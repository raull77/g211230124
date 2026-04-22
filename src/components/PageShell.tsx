import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  /** Tambahkan padding-top default untuk konten di bawah navbar */
  withTopPadding?: boolean;
}

export const PageShell = ({ children, withTopPadding = true }: PageShellProps) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className={`flex-1 ${withTopPadding ? "pt-32" : ""}`}>{children}</main>
      <Footer />
    </div>
  );
};
