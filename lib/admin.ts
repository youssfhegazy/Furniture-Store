/**
 * Admin identity by email allowlist.
 *
 * Owner admins come from NEXT_PUBLIC_ADMIN_EMAILS (comma-separated) or the
 * default below. The shared demo admin is always an admin, but is treated as
 * read-only (see isDemoAdminEmail) so portfolio visitors can explore the
 * dashboard without being able to change data.
 */

/** The shared, read-only demo administrator used by the "Explore as demo admin" button. */
export const DEMO_ADMIN = {
  name: "Demo Admin",
  email: "demo-admin@furniflex.app",
} as const;

const OWNER_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",")
  : ["youssifhegazy35@gmail.com"];

const ADMIN_EMAILS = [...OWNER_EMAILS, DEMO_ADMIN.email]
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** True if the email may access the admin dashboard at all. */
export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

/** True for the shared demo admin — full read access, but mutations are blocked. */
export function isDemoAdminEmail(email?: string | null): boolean {
  return !!email && email.toLowerCase() === DEMO_ADMIN.email.toLowerCase();
}
