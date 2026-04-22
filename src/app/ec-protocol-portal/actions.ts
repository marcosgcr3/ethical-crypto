"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

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
}) {
  try {
    await verifyAuth();
    
    // Enforce obtaining the first reviewer (since we seeded a default doctor)
    const reviewer = await prisma.reviewer.findFirst();
    if (!reviewer) {
      throw new Error("Missing Author: No reviewer found in database. Use seed or create one in the database.");
    }

    const { id, title, slug, category, excerpt, imageUrl, content, published, createdAt } = data;

    if (id) {
      const existingArticle = await prisma.article.findUnique({
        where: { id },
        select: { published: true }
      });

      // Determine if we should update the "published at" (createdAt) date
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
          createdAt: finalCreatedAt || new Date(),
        },
      });
    }

    // Revalidate the entire site cache
    revalidatePath("/");
    revalidatePath("/ec-protocol-portal");
    revalidatePath(`/${category}`);
    revalidatePath(`/${category}/${slug}`);

    return { success: true };
  } catch (err: any) {
    console.error("Critical error in upsertArticle:", err);
    return { 
      success: false, 
      error: err.message || "Protocol transmission failed. Verify database connection." 
    };
  }
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
