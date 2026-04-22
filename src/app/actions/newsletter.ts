"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function subscribeEmail(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: true, message: "You're already subscribed!" };
    }

    await prisma.subscriber.create({
      data: { email },
    });

    // Revalidate the admin dashboard so the new subscriber appears
    revalidatePath("/ec-protocol-portal");
    revalidatePath("/");

    return { success: true, message: "Welcome to the Ethical Crypto intelligence stream!" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function getSubscribers() {
  try {
    return await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}
