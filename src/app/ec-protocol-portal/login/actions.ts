"use server";

import { redirect } from "next/navigation";
import { createSession, logout, checkRateLimit, recordLoginAttempt } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");

  // 1. Brute-force check
  const rateLimit = await checkRateLimit();
  if (rateLimit.limited) {
    return { error: `Too many attempts. Locked for ${rateLimit.remainingTime} minutes.` };
  }

  // 2. Security: No hardcoded fallback
  const ADMIN_PASS = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASS) {
      console.error("FATAL SECURITY ALERT: ADMIN_PASSWORD environment variable is missing.");
      return { error: "Authentication system is currently disabled for security reasons." };
  }

  // 3. Validation
  if (password === ADMIN_PASS) {
    await recordLoginAttempt(true);
    await createSession("admin-root");
    // Redirect to the obfuscated dashboard
    redirect("/ec-protocol-portal");
  } else {
    await recordLoginAttempt(false);
    return { error: "Invalid password. Your IP has been logged for security audit." };
  }
}

export async function logoutAction() {
    await logout();
    redirect("/");
}
