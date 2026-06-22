"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

import type { ShopProduct } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const { has, toggle } = useFavorites();
  const requireAuth = useRequireAuth();
  const liked = has(product.name);
  const href = `/products/${product.slug}`;

  const handleAddToCart = () => {
    addItem({ name: product.name, price: product.price, image: product.image });
    toast.success("Added to cart", { description: product.name });
  };

  const handleToggleFavorite = () => {
    if (!requireAuth("Sign in to save items to your favourites.")) return;
    toggle({
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    if (liked) toast.info("Removed from favourites", { description: product.name });
    else toast.success("Added to favourites", { description: product.name });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-teal px-2.5 py-1 text-xs font-medium text-white">
          -{product.discount}%
        </span>
        <button
          onClick={handleToggleFavorite}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm transition-transform hover:scale-110"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              liked && "fill-red-500 text-red-500"
            )}
          />
        </button>
        <Link href={href} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={href}>
            <h3 className="truncate text-sm font-medium text-ink transition-colors hover:text-gold">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm">
            <span className="font-semibold text-ink">
              ${product.price.toFixed(2)}
            </span>{" "}
            <span className="text-ink-soft line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark active:scale-95"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
