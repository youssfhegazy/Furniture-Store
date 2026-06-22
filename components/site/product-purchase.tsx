"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Gift,
  Heart,
  Minus,
  Plus,
  Share2,
  Star,
} from "lucide-react";

import { useRouter } from "next/navigation";

import type { ShopProduct } from "@/lib/data";
import { productCoupon, productDetail } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { useRequireAuth } from "@/lib/use-require-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function ProductPurchase({ product }: { product: ShopProduct }) {
  const detail = productDetail(product);
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useCart();
  const { has, toggle } = useFavorites();
  const requireAuth = useRequireAuth();
  const liked = has(product.name);
  const [qty, setQty] = useState(1);

  const cartInput = {
    name: product.name,
    price: product.price,
    image: product.image,
  };
  const addToCart = () => {
    addItem(cartInput, qty);
    toast.success("Added to cart", {
      description: `${qty} × ${product.name}`,
    });
  };
  const buyNow = () => {
    addItem(cartInput, qty);
    router.push("/cart");
  };
  const toggleFavorite = () => {
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
    <div>
      {/* Save / Choice Day banner */}
      <div className="flex items-center justify-between rounded-xl bg-muted px-5 py-3.5">
        <span className="flex items-center gap-2 font-medium text-ink">
          <Gift className="h-5 w-5 text-gold" /> Save {detail.save}$
        </span>
        <span className="flex items-center gap-1.5 text-sm text-ink-soft">
          Choice Day <CalendarDays className="h-4 w-4 text-gold" />
        </span>
      </div>

      {/* Title */}
      <p className="mt-6 text-sm text-ink-soft">{product.name}</p>
      <h2 className="mt-2 text-2xl font-semibold leading-snug text-ink">
        {detail.headline}
      </h2>

      {/* Price */}
      <div className="mt-5 flex items-center gap-3">
        <span className="text-2xl font-bold text-ink">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-base text-ink-soft line-through">
          ${product.oldPrice.toFixed(2)}
        </span>
      </div>

      {/* Code + stock */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="text-ink-soft">
          Product code : <span className="text-ink">{detail.code}</span>
        </span>
        {product.inStock ? (
          <span className="flex items-center gap-1.5 font-medium text-teal">
            <BadgeCheck className="h-4 w-4" /> In Stock
          </span>
        ) : (
          <span className="font-medium text-red-500">Out of Stock</span>
        )}
      </div>

      {/* Rating */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
        <span className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
          ))}
          <span className="ml-1 font-medium text-ink">{detail.rating}</span>
        </span>
        <span className="text-ink/20">|</span>
        <span>{detail.reviews} Reviews</span>
        <span className="text-ink/20">|</span>
        <span>{detail.sold} sold</span>
      </div>

      {/* Quantity + actions */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 px-2 py-1.5">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">
            {String(qty).padStart(2, "0")}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button size="lg" className="flex-1 sm:flex-none" onClick={buyNow}>
          Buy Now
        </Button>
        <Button
          variant="teal"
          size="lg"
          className="flex-1 sm:flex-none"
          onClick={addToCart}
        >
          Add To Cart
        </Button>
        <button
          onClick={toggleFavorite}
          aria-label="Add to wishlist"
          className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
        >
          <Heart
            className={cn("h-5 w-5", liked && "fill-red-500 text-red-500")}
          />
        </button>
        <button
          aria-label="Share"
          className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Coupon */}
      <div className="mt-9">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Coupon &amp; Discount</h2>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink/20" />
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="h-2 w-2 rounded-full bg-ink/20" />
          </div>
        </div>

        <div className="mt-4 flex overflow-hidden rounded-2xl bg-[#1c1c1c] text-white">
          <div className="flex items-center gap-1 border-r border-dashed border-white/25 px-4 py-6">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl] rotate-180"
              >
                Coupon
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-7 text-center">
            <p className="text-2xl font-bold">{productCoupon.title}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/70">
              {productCoupon.subtitle}
            </p>
            <p className="mt-3 text-sm font-semibold text-gold">
              USE CODE: {productCoupon.code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
