"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from "next-auth/react";

export type User = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

type StoredUser = User & { password: string };

type Result = { ok: boolean; error?: string };

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Result;
  signIn: (data: { email: string; password: string }) => Result;
  /** Start the Google OAuth flow (NextAuth). Persists the user in MongoDB. */
  signInWithGoogle: () => void;
  signOut: () => void;
  updateProfile: (data: Partial<Pick<User, "name" | "phone" | "avatar">>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "furniflex-users";
const CURRENT_KEY = "furniflex-current-user";
// Profile edits (phone/avatar/name) for OAuth users, keyed by email. NextAuth
// only gives us name + image, so we layer local edits on top of the session.
const OAUTH_OVERRIDES_KEY = "furniflex-oauth-overrides";

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
  } catch {
    return [];
  }
}
function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}
const strip = (u: StoredUser): User => ({
  name: u.name,
  email: u.email,
  phone: u.phone,
  avatar: u.avatar,
});

type Overrides = Record<string, Partial<User>>;
function readOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(OAUTH_OVERRIDES_KEY) || "{}") as Overrides;
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [localHydrated, setLocalHydrated] = useState(false);
  const [overrides, setOverrides] = useState<Overrides>({});

  useEffect(() => {
    const email = localStorage.getItem(CURRENT_KEY);
    if (email) {
      const found = readUsers().find((u) => u.email === email);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setLocalUser(strip(found));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOverrides(readOverrides());
    setLocalHydrated(true);
  }, []);

  // A Google session (if any) takes precedence over the local credential user.
  const oauthEmail = session?.user?.email?.toLowerCase() ?? null;
  const oauthUser: User | null = oauthEmail
    ? {
        name: session!.user!.name ?? oauthEmail,
        email: oauthEmail,
        phone: "",
        avatar: session!.user!.image ?? "",
        ...overrides[oauthEmail],
      }
    : null;

  const user = oauthUser ?? localUser;
  const hydrated = localHydrated && status !== "loading";

  const signUp = useCallback(
    ({ name, email, password }: { name: string; email: string; password: string }): Result => {
      email = email.trim().toLowerCase();
      const users = readUsers();
      if (users.some((u) => u.email === email)) {
        return { ok: false, error: "An account with this email already exists." };
      }
      const newUser: StoredUser = { name, email, password, phone: "", avatar: "" };
      writeUsers([...users, newUser]);
      localStorage.setItem(CURRENT_KEY, email);
      setLocalUser(strip(newUser));
      return { ok: true };
    },
    []
  );

  const signIn = useCallback(
    ({ email, password }: { email: string; password: string }): Result => {
      email = email.trim().toLowerCase();
      const found = readUsers().find((u) => u.email === email);
      if (!found || found.password !== password) {
        return { ok: false, error: "Invalid email or password." };
      }
      localStorage.setItem(CURRENT_KEY, email);
      setLocalUser(strip(found));
      return { ok: true };
    },
    []
  );

  const signInWithGoogle = useCallback(() => {
    void nextAuthSignIn("google", { callbackUrl: "/profile" });
  }, []);

  const signOut = useCallback(() => {
    if (oauthUser) {
      void nextAuthSignOut({ callbackUrl: "/" });
      return;
    }
    localStorage.removeItem(CURRENT_KEY);
    setLocalUser(null);
  }, [oauthUser]);

  const updateProfile = useCallback(
    (data: Partial<Pick<User, "name" | "phone" | "avatar">>) => {
      // OAuth user: layer the edit on top of the session and persist by email.
      if (oauthEmail) {
        setOverrides((prev) => {
          const next = { ...prev, [oauthEmail]: { ...prev[oauthEmail], ...data } };
          try {
            localStorage.setItem(OAUTH_OVERRIDES_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
          return next;
        });
        return;
      }
      setLocalUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...data };
        const users = readUsers().map((u) =>
          u.email === prev.email ? { ...u, ...data } : u
        );
        writeUsers(users);
        return next;
      });
    },
    [oauthEmail]
  );

  const value = useMemo(
    () => ({ user, hydrated, signUp, signIn, signInWithGoogle, signOut, updateProfile }),
    [user, hydrated, signUp, signIn, signInWithGoogle, signOut, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
