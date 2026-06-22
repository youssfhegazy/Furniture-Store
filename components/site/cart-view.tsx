"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const COUPONS: Record<string, number> = { TW015: 0.15, SAVE10: 0.1 };

export function CartView() {
  const { toast } = useToast();
  const { items, subtotal, hydrated, setQuantity, removeItem } = useCart();
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; rate: number } | null>(
    null
  );
  const [error, setError] = useState("");

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon({ code, rate: COUPONS[code] });
      setError("");
      toast.success("Coupon applied", { description: `${code} is now active.` });
    } else {
      setCoupon(null);
      setError("Invalid coupon code");
      toast.error("Invalid coupon", { description: `"${code}" isn't a valid code.` });
    }
  };

  const handleRemove = (key: string, name: string) => {
    removeItem(key);
    toast.info("Removed from cart", { description: name });
  };

  const discount = coupon ? subtotal * coupon.rate : 0;
  const total = subtotal - discount;

  if (!hydrated) {
    return <div className="container-x py-20" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <section className="container-x py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted text-ink-soft">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-ink">
          Your cart is empty
        </h2>
        <p className="mt-2 text-ink-soft">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/products">
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Items table */}
        <div className="overflow-hidden rounded-2xl bg-muted/40">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 bg-teal px-6 py-4 text-sm font-medium text-white">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span className="w-6" />
          </div>

          <div className="divide-y divide-ink/10">
            {items.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-5"
              >
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm text-ink">
                  ${item.price.toFixed(2)}
                </span>

                <div className="flex w-fit items-center gap-1 rounded-full border border-ink/15 bg-white px-1.5 py-1">
                  <button
                    onClick={() => setQuantity(item.key, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="grid h-7 w-7 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-medium tabular-nums">
                    {String(item.quantity).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => setQuantity(item.key, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="grid h-7 w-7 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="text-sm font-medium text-ink">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => handleRemove(item.key, item.name)}
                  aria-label={`Remove ${item.name}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/10 hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl bg-muted/40 p-6">
          <h2 className="border-b border-ink/10 pb-4 text-lg font-semibold text-ink">
            Order Summary
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-medium text-ink">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Shipping</span>
              <span className="font-medium text-teal">Free</span>
            </div>

            {coupon && (
              <div className="flex items-center justify-between">
                <span className="text-ink-soft">Discount ({coupon.code})</span>
                <span className="font-medium text-ink">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Coupon */}
            {couponOpen ? (
              <div className="pt-1">
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full rounded-full border border-ink/15 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                  <Button size="sm" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
                {coupon && (
                  <p className="mt-1.5 text-xs text-teal">
                    Coupon {coupon.code} applied!
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCouponOpen(true)}
                className="flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-gold-dark"
              >
                Add Coupon code <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
            <span className="font-semibold text-ink">Total</span>
            <span className="text-lg font-bold text-ink">
              ${total.toFixed(2)}
            </span>
          </div>

          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/cart/checkout">Proceed To Checkout</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
