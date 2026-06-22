import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { connectDB, hasDB } from "@/lib/mongodb";
import { User } from "@/lib/models";

/**
 * NextAuth (Auth.js v5) configuration.
 *
 * Credentials come from `.env.local` via v5's env inference:
 *   AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET (and optional AUTH_URL).
 *
 * Sessions are stateless JWTs (no DB adapter); instead we upsert the user
 * document into MongoDB in the `signIn` callback so every login/registration
 * is persisted in the `users` collection.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  // Self-hosted / localhost: trust the incoming Host header (Auth.js only
  // auto-trusts on Vercel). Without this every /api/auth/* call 500s.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;
      // Persist the account; never block sign-in if the DB is down/unset.
      if (!hasDB) return true;
      try {
        await connectDB();
        await User.findOneAndUpdate(
          { email: user.email.toLowerCase() },
          {
            $set: {
              name: user.name,
              image: user.image,
              provider: "google",
              emailVerified: new Date(),
            },
          },
          { upsert: true, setDefaultsOnInsert: true }
        );
      } catch (err) {
        console.error("[auth] failed to persist user to MongoDB:", err);
      }
      return true;
    },
  },
});
