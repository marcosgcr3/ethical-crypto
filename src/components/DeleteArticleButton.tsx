"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/app/ec-protocol-portal/actions";

interface DeleteArticleButtonProps {
  articleId: string;
}

export default function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-reset confirmation after 6 seconds
  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  const handleDelete = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteArticle(articleId);
      if (res?.success) {
        setIsDeleting(false);
        setIsConfirming(false);
        router.refresh();
      } else {
        console.error("Failed to delete article: server returned success false");
        setIsDeleting(false);
        setIsConfirming(false);
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-xs font-bold uppercase tracking-wide px-2 py-1 transition-all duration-200 ${
        isConfirming 
          ? "text-white bg-red-600 rounded-lg shadow-sm" 
          : "text-red-500 hover:text-red-700"
      } ${isDeleting ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {isDeleting ? "Deleting..." : isConfirming ? "Confirm?" : "Delete"}
    </button>
  );
}

