import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
const SECRET_KEY = process.env.SESSION_SECRET || "ec_crypto_default_secret_32_chars_long_and_more";
const key = new TextEncoder().encode(SECRET_KEY);

export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function checkRateLimit() {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";

  const log = await prisma.securityLog.findFirst({
    where: { ip },
  });

  if (log && log.isLocked && log.lockedUntil) {
    if (new Date() < log.lockedUntil) {
      return { limited: true, remainingTime: Math.ceil((log.lockedUntil.getTime() - Date.now()) / 1000 / 60) };
    } else {
      // Reset lockout
      await prisma.securityLog.update({
        where: { id: log.id },
        data: { isLocked: false, attempts: 0, lockedUntil: null },
      });
    }
  }

  return { limited: false, log };
}

export async function recordLoginAttempt(success: boolean) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";

  const log = await prisma.securityLog.findFirst({
    where: { ip },
  });

  if (success) {
    if (log) {
      await prisma.securityLog.update({
        where: { id: log.id },
        data: { attempts: 0, isLocked: false, lockedUntil: null },
      });
    }
    return;
  }

  // Failed attempt
  if (!log) {
    await prisma.securityLog.create({
      data: { ip, attempts: 1 },
    });
  } else {
    const newAttempts = log.attempts + 1;
    const shouldLock = newAttempts >= MAX_ATTEMPTS;

    await prisma.securityLog.update({
      where: { id: log.id },
      data: { 
        attempts: newAttempts,
        lastAttempt: new Date(),
        isLocked: shouldLock,
        lockedUntil: shouldLock ? new Date(Date.now() + LOCKOUT_DURATION) : null
      },
    });
  }
}

export async function createSession(adminId: string) {
  // ... rest of the functions
  const expires = new Date(Date.now() + SESSION_DURATION);
  const session = await encrypt({ adminId, expires });

  const cookieStore = await cookies();
  cookieStore.set("admin_session", session, { 
    expires, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    path: "/" 
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) return null;

  // Parsed session
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + SESSION_DURATION);
  const res = NextResponse.next();
  res.cookies.set({
    name: "admin_session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
