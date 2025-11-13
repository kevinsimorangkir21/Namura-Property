"use client";

import { usePathname } from "next/navigation";

import FooterID from "@/components/ui/id/Footer";
import FooterEN from "@/components/ui/en/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const isID = pathname.startsWith("/id");

  return isID ? <FooterID /> : <FooterEN />;
}
