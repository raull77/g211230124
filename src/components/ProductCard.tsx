import { Product } from "@/lib/mockData";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/marketplace#${product.id}`}
      className="iridescent-border rounded-2xl overflow-hidden group block transition-transform hover:-translate-y-1 duration-500"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={500}
          height={667}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {product.certified && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border-primary/30">
              <ShieldCheck className="size-3" />
              Certified
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 glass rounded-full text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {product.category}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] mono text-muted-foreground uppercase tracking-widest mb-1">
            {product.tokenId} • {product.region}
          </p>
          <h3 className="font-display text-lg font-bold leading-tight mb-2 text-balance">{product.name}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Price</p>
              <p className="mono text-base font-semibold text-primary">{product.price} ETH</p>
            </div>
            <p className="text-[10px] mono text-muted-foreground">
              {product.available} tersedia
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
