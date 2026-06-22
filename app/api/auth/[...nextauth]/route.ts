import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Mongoose (used by the signIn callback) requires the Node.js runtime.
export const runtime = "nodejs";
