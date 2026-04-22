"use client";

import React from "react";
import { useNewsletter } from "../context/NewsletterContext";

interface NewsletterSidebarProps {
  layout?: "sidebar" | "mobile";
}

export default function NewsletterSidebar({ layout = "sidebar" }: NewsletterSidebarProps) {
  return null;
}
