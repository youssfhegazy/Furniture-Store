"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const COUNTRIES = ["United States", "United Kingdom", "Germany", "Egypt", "Canada"];
const CITIES = ["New Jersey", "New York", "Los Angeles", "Chicago", "Austin"];
const DIAL_CODES = ["+1", "+44", "+20", "+380", "+49"];

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-ink-soft">{label}</label>
        {required && (
          <span className="text-xs font-medium italic text-red-500">
            Required
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-transparent bg-muted px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-gold focus:bg-white focus:outline-none";

function PaymentMarks() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="grid h-5 w-8 place-items-center rounded bg-white text-[9px] font-bold italic text-[#1a1f71] ring-1 ring-ink/10">
        VISA
      </span>
      <span className="grid h-5 w-8 place-items-center rounded bg-white ring-1 ring-ink/10">
        <span className="flex">
          <span className="h-3 w-3 rounded-full bg-[#eb001b]" />
          <span className="-ml-1 h-3 w-3 rounded-full bg-[#f79e1b]/90" />
        </span>
      </span>
      <span className="grid h-5 w-8 place-items-center rounded bg-[#006fcf] text-[7px] font-bold text-white">
        AMEX
      </span>
    </span>
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={cn(
          "grid h-5 w-5 place-items-center rounded-full border-2",
          checked ? "border-gold" : "border-ink/30"
        )}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </span>
      <span className={cn("text-sm", checked ? "font-medium text-ink" : "text-ink-soft")}>
        {label}
      </span>
    </button>
  );
}

function CheckBox({
  label,
  checked,
  onChange,
  tone = "ink",
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  tone?: "ink" | "gold";
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2.5 text-left"
    >
      <span
        className={cn(
          "grid h-5 w-5 place-items-center rounded-md transition-colors",
          checked
            ? tone === "gold"
              ? "bg-gold text-white"
              : "bg-ink text-white"
            : "border border-ink/30"
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <span
        className={cn(
          "text-sm",
          checked && tone === "gold" ? "font-medium text-gold" : "text-ink-soft"
        )}
      >
        {label}
      </span>
    </button>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, count, subtotal, hydrated, clear } = useCart();
  const [payment, setPayment] = useState("card");
  const [useShipping, setUseShipping] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const total = subtotal;

  const confirm = () => {
    if (!acceptTerms) {
      toast.error("Please accept the Terms & Conditions to continue.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    toast.success("Payment confirmed", { description: "Finishing your order…" });
    const order = {
      number: `#${Math.floor(100000000 + Math.random() * 900000000)}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      items: count,
      total,
    };
    try {
      sessionStorage.setItem("furniflex-last-order", JSON.stringify(order));
    } catch {
      // ignore storage errors
    }
    clear();
    router.push("/cart/order-completed");
  };

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1.7fr_1fr]">
        {/* Billing form */}
        <div>
          <h1 className="text-3xl font-semibold text-ink">Billing Details</h1>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="First Name" required>
              <input className={inputCls} defaultValue="Eduard" />
            </Field>
            <Field label="Last Name" required>
              <input className={inputCls} defaultValue="Franz" />
            </Field>

            <Field label="Phone Number" required>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-gold">
                <select className="bg-transparent py-1.5 text-sm focus:outline-none">
                  {DIAL_CODES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <input
                  className="w-full bg-transparent py-1.5 text-sm focus:outline-none"
                  defaultValue="544-45678"
                />
                <BadgeCheck className="h-5 w-5 shrink-0 text-gold" />
              </div>
            </Field>
            <Field label="Email Address" required>
              <input
                type="email"
                className={inputCls}
                placeholder="Email Address"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Company Name (Optional)">
                <input className={inputCls} placeholder="Company Name" />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Country" required>
                <select className={inputCls} defaultValue="United States">
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="City" required>
              <select className={inputCls} defaultValue="New Jersey">
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Address" required>
              <input className={inputCls} defaultValue="2624 Royal Ln.Mesa" />
            </Field>
            <Field label="ZIP Code" required>
              <input className={inputCls} defaultValue="347690" />
            </Field>
          </div>

          {/* Payment */}
          <h2 className="mt-12 text-2xl font-semibold text-ink">
            How would you like to pay?
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            <Radio
              label="Pay with Credit Card"
              checked={payment === "card"}
              onChange={() => setPayment("card")}
            />
            <Radio
              label="Pay with PayPal"
              checked={payment === "paypal"}
              onChange={() => setPayment("paypal")}
            />
            <Radio
              label="Use Gift card"
              checked={payment === "gift"}
              onChange={() => setPayment("gift")}
            />
          </div>

          {payment === "card" && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Name on card">
                <input className={inputCls} defaultValue="Eduard Franz" />
              </Field>
              <Field label="Card Number">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-gold">
                  <input
                    className="w-full bg-transparent text-sm focus:outline-none"
                    defaultValue="243567876876"
                  />
                  <PaymentMarks />
                </div>
              </Field>
              <Field label="Expiration">
                <input className={inputCls} defaultValue="5/24" />
              </Field>
              <Field label="CCV">
                <input className={inputCls} placeholder="•••" />
              </Field>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <CheckBox
              label="Use shipping address as billing address"
              checked={useShipping}
              onChange={() => setUseShipping((v) => !v)}
              tone="gold"
            />
            <CheckBox
              label="I accept FurniFlex Terms & Conditions"
              checked={acceptTerms}
              onChange={() => setAcceptTerms((v) => !v)}
            />
          </div>
        </div>

        {/* Order summary */}
        <div className="overflow-hidden rounded-2xl bg-muted/40">
          <div className="bg-teal px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Order Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
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
              <button className="flex items-center gap-1.5 font-medium text-gold">
                Add Coupon code <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="font-semibold text-ink">Total</span>
              <span className="text-lg font-bold text-ink">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="mt-5 flex gap-3">
              <Button className="flex-1" onClick={confirm} disabled={!hydrated}>
                Confirm Payment
              </Button>
              <Button
                variant="teal"
                className="flex-1 bg-ink/80 hover:bg-ink"
                onClick={() => router.push("/cart")}
              >
                Cancel
              </Button>
            </div>
            {hydrated && items.length === 0 && (
              <p className="mt-3 text-center text-xs text-ink-soft">
                Your cart is empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
