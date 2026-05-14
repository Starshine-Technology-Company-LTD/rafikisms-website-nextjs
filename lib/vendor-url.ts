/**
 * Vendor SPA URLs. Override with NEXT_PUBLIC_VENDOR_* when needed.
 */
export function getVendorSignInUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VENDOR_SIGNIN_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") {
    return "https://vendor.rafikisms.com/auth/login";
  }
  return "http://localhost:8080/auth/login";
}

/** Primary onboarding CTA on the marketing site -> vendor registration. */
export function getVendorRegisterUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VENDOR_REGISTER_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") {
    return "https://vendor.rafikisms.com/auth/register";
  }
  return "http://localhost:8080/auth/register";
}
