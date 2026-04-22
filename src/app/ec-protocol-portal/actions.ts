"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

async function verifyAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized access to administrative actions.");
}

export async function upsertArticle(data: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  imageUrl?: string | null;
  content: string;
  published: boolean;
  createdAt?: string | Date | null;
  amazonProducts?: any;
}) {
  await verifyAuth();
  
  // Enforce obtaining the first reviewer (since we seeded a default doctor)
  const reviewer = await prisma.reviewer.findFirst();
  if (!reviewer) {
    throw new Error("No reviewer found for authorship. Please seed the DB.");
  }

  const { id, title, slug, category, excerpt, imageUrl, content, published, amazonProducts, createdAt } = data;

  if (id) {
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { published: true }
    });

    // Determine if we should update the "published at" (createdAt) date
    // 1. If it was unpublished and is now being published
    const shouldUpdatePublishDate = existingArticle && !existingArticle.published && published;
    
    let finalCreatedAt = createdAt ? new Date(createdAt) : undefined;
    if (!finalCreatedAt && shouldUpdatePublishDate) {
      finalCreatedAt = new Date();
    }

    // Update Mode
    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        excerpt,
        imageUrl,
        content,
        published,
        createdAt: finalCreatedAt,
        amazonProducts: amazonProducts || [],
      },
    });
  } else {
    // Create Mode
    let finalCreatedAt = createdAt ? new Date(createdAt) : undefined;
    if (!finalCreatedAt && published) {
      finalCreatedAt = new Date();
    }
    
    await prisma.article.create({
      data: {
        title,
        slug,
        category,
        excerpt,
        imageUrl,
        content,
        reviewerId: reviewer.id,
        published,
        createdAt: finalCreatedAt || new Date(), // Always defaults to now if not provided
        amazonProducts: amazonProducts || [],
      },
    });
  }

  // Revalidate the entire site cache so updates show up immediately
  revalidatePath("/");
  revalidatePath("/ec-protocol-portal");
  revalidatePath(`/${category}`);
  revalidatePath(`/${category}/${slug}`);

  // Need a return object to trigger client-side redirects securely
  return { success: true };
}

export async function deleteArticle(id: string) {
  await verifyAuth();
  const article = await prisma.article.findUnique({ where: { id } });
  if (article) {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/ec-protocol-portal");
    revalidatePath(`/${article.category}`);
  }
  return { success: true };
}

export async function upsertFounder(data: {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string | null;
}) {
  await verifyAuth();
  const { name, title, bio, imageUrl } = data;

  await prisma.reviewer.upsert({
    where: { id: 'marcus-sterling-id' },
    update: { name, title, bio, imageUrl },
    create: { id: 'marcus-sterling-id', name, title, bio, imageUrl },
  });

  revalidatePath("/");
  revalidatePath("/ec-protocol-portal");
  revalidatePath("/about");
  
  return { success: true };
}
