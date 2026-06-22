"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, LogOut, Trash2, Upload, User as UserIcon } from "lucide-react";

import { useAuth, type User } from "@/lib/auth-context";
import { useFavorites } from "@/lib/favorites-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type Tab = "profile" | "favourites";

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:bg-muted disabled:text-ink-soft";

function Avatar({ src, name, size = 80 }: { src?: string; name: string; size?: number }) {
  if (src) {
    return (
      // user-uploaded data URL — plain img avoids next/image data-URI constraints
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="h-full w-full rounded-full object-cover"
      />
    );
  }
  return (
    <span className="grid h-full w-full place-items-center rounded-full bg-teal/10 text-2xl font-semibold text-teal">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function ProfileForm({
  user,
  onSave,
  onAvatar,
}: {
  user: User;
  onSave: (data: { name: string; phone: string }) => void;
  onAvatar: (dataUrl: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [saved, setSaved] = useState(false);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: name.trim() || user.name, phone: phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">My Profile</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Manage your personal information.
      </p>

      <div className="mt-6 flex items-center gap-5">
        <span className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold/20">
          <Avatar src={user.avatar} name={user.name} />
        </span>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="hidden"
          />
          <Button
            type="button"
            variant="teal"
            size="sm"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-4 w-4" /> Change Image
          </Button>
          <p className="mt-1.5 text-xs text-ink-soft">JPG or PNG, up to ~2MB.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Phone number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 000 0000"
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-ink-soft">
            Email (read only)
          </label>
          <input value={user.email} disabled className={inputCls} />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit">Save Changes</Button>
          {saved && <span className="text-sm font-medium text-teal">Saved!</span>}
        </div>
      </form>
    </div>
  );
}

export function ProfileView({ initialTab }: { initialTab: Tab }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, hydrated, signOut, updateProfile } = useAuth();
  const { favorites, remove } = useFavorites();
  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (hydrated && !user) router.replace("/sign-in");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return <div className="container-x py-24" aria-hidden />;
  }

  const logout = () => {
    signOut();
    toast.info("Signed out");
    router.push("/");
  };

  const removeFavorite = (key: string, name: string) => {
    remove(key);
    toast.info("Removed from favourites", { description: name });
  };

  const navItems: { id: Tab; label: string; icon: typeof UserIcon }[] = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "favourites", label: "Favourites", icon: Heart },
  ];

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-3 border-b border-ink/10 pb-5">
            <span className="h-12 w-12 overflow-hidden rounded-full">
              <Avatar src={user.avatar} name={user.name} size={48} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-ink-soft">{user.email}</p>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  tab === item.id
                    ? "bg-gold/10 text-gold"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.id === "favourites" && favorites.length > 0 && (
                  <span className="ml-auto rounded-full bg-gold/15 px-2 text-xs text-gold">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={logout}
              className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="rounded-2xl border border-ink/10 bg-white p-6 lg:p-8">
          {tab === "profile" ? (
            <ProfileForm
              user={user}
              onSave={(data) => {
                updateProfile(data);
                toast.success("Profile updated");
              }}
              onAvatar={(avatar) => {
                updateProfile({ avatar });
                toast.success("Photo updated");
              }}
            />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold text-ink">My Favourites</h1>
              <p className="mt-1 text-sm text-ink-soft">
                Pieces you&apos;ve saved for later.
              </p>

              {favorites.length === 0 ? (
                <div className="mt-10 grid place-items-center rounded-xl bg-muted/40 py-16 text-center">
                  <Heart className="h-8 w-8 text-ink-soft" />
                  <p className="mt-3 font-medium text-ink">No favourites yet</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Tap the heart on any product to save it here.
                  </p>
                  <Button asChild size="sm" className="mt-5">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                  {favorites.map((item) => (
                    <div key={item.key} className="group">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                        <button
                          onClick={() => removeFavorite(item.key, item.name)}
                          aria-label={`Remove ${item.name}`}
                          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Link href={`/products/${item.slug}`} className="block h-full w-full">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="mt-3 text-sm font-medium text-ink hover:text-gold">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
