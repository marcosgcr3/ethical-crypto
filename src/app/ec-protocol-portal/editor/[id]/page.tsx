import { PrismaClient } from "@prisma/client";
import AdminForm from "@/components/AdminForm";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditorPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  let article = null;

  if (id !== "new") {
    article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      notFound();
    }
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <div className="mb-8">
        <Link href="/ec-protocol-portal" className="text-xs font-bold uppercase tracking-widest text-slate opacity-60 hover:opacity-100 transition-opacity flex items-center mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-extrabold text-bioblue uppercase tracking-tight">
          {article ? "Edit Article" : "Create New Article"}
        </h1>
        <p className="opacity-70 mt-2 text-sm">Fill in the metadata and inject raw HTML to publish directly to your PostgreSQL database.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-gray-100">
        <AdminForm article={article ? { ...article, category: article.category ?? '' } : undefined} />
      </div>
    </div>
  );
}
