"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { slugify } from "@/lib/data";

export type FavoriteItem = {
  key: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

export type FavoriteInput = {
  name: string;
  price: number;
  image: string;
  slug?: string;
};

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  count: number;
  hydrated: boolean;
  has: (name: string) => boolean;
  toggle: (item: FavoriteInput) => void;
  remove: (key: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "furniflex-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setFavorites(JSON.parse(raw) as FavoriteItem[]);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites, hydrated]);

  const has = useCallback(
    (name: string) => favorites.some((f) => f.key === slugify(name)),
    [favorites]
  );

  const toggle = useCallback((item: FavoriteInput) => {
    const key = slugify(item.name);
    setFavorites((prev) => {
      if (prev.some((f) => f.key === key)) {
        return prev.filter((f) => f.key !== key);
      }
      return [
        ...prev,
        { key, name: item.name, price: item.price, image: item.image, slug: item.slug ?? key },
      ];
    });
  }, []);

  const remove = useCallback((key: string) => {
    setFavorites((prev) => prev.filter((f) => f.key !== key));
  }, []);

  const value = useMemo(
    () => ({ favorites, count: favorites.length, hydrated, has, toggle, remove }),
    [favorites, hydrated, has, toggle, remove]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
