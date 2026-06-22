"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

type Order = {
  number: string;
  date: string;
  items: number;
  total: number;
};

const FALLBACK: Order = {
  number: "#123456789",
  date: "May 7, 2024",
  items: 4,
  total: 774.96,
};

export function OrderCompleted() {
  const [order, setOrder] = useState<Order>(FALLBACK);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("furniflex-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      // keep fallback
    }
  }, []);

  return (
    <section className="container-x py-16 lg:py-20">
      {/* Decorative success mark */}
      <div className="relative mx-auto flex h-28 w-64 items-center justify-center">
        <span className="absolute left-8 top-2 text-2xl text-teal">★</span>
        <span className="absolute left-2 bottom-2 text-xl text-teal">★</span>
        <span className="absolute right-10 top-0 text-2xl text-teal">★</span>
        <span className="absolute right-2 bottom-3 text-xl text-teal">★</span>
        {/* swirl arrows */}
        <svg className="absolute left-0 top-3 h-12 w-16 text-teal" viewBox="0 0 60 50" fill="none">
          <path d="M55 5 C 30 0, 10 15, 8 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 40 l -4 -8 M8 40 l 8 -3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-0 top-2 h-14 w-20 text-gold" viewBox="0 0 70 55" fill="none">
          <path d="M5 8 C 40 -2, 62 12, 50 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 45 l 8 -4 M50 45 l -3 -9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-white shadow-[0_0_0_8px_rgba(224,168,46,0.15)]">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
      </div>

      <h1 className="mt-6 text-center text-3xl font-semibold text-ink sm:text-4xl">
        Thank you for your purchase!
      </h1>
      <p className="mt-3 text-center text-ink-soft">
        Your order has been successfully processed.
        <br />
        Here are the details
      </p>

      {/* Order summary card */}
      <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl bg-muted/40">
        <div className="bg-teal px-6 py-4">
          <h2 className="font-semibold text-white">Order Summary</h2>
        </div>
        <div className="px-6 py-5">
          <dl className="space-y-3 text-sm">
            <Row label="Order Number" value={order.number} />
            <Row label="Date" value={order.date} />
            <Row label="Items Purchased" value={`${order.items} Total Item`} />
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
            <span className="font-semibold text-ink">Total</span>
            <span className="font-bold text-ink">${order.total.toFixed(2)}</span>
          </div>
          <Button size="lg" className="mt-5 w-full">
            View Order Details
          </Button>
        </div>
      </div>

      {/* Order status */}
      <div className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">Order Status:</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Your order is now complete and will be processed for shipment. You
          will receive a confirmation email shortly with tracking information
          once your items have been dispatched.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Thank you for shopping with us! If you have any questions or concerns,
          please don&apos;t hesitate to contact our customer support team at
          <br />
          <span className="font-medium text-teal">
            Email: mdaminur.oc@gmail.com
          </span>{" "}
          or
          <br />
          <span className="font-medium text-teal">
            Phone No+8801405074838
          </span>
        </p>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
