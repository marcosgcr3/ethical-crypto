"use client";

import React, { useState, useEffect } from "react";
import { deleteArticle } from "../app/eb-clinical-portal/actions";

interface DeleteArticleButtonProps {
  articleId: string;
}

export default function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-reset confirmation after 3 seconds
  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, 3000);
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
      await deleteArticle(articleId);
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
