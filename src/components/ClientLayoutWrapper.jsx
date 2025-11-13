"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/NavbarWrapper";
import Footer from "@/components/FooterWrapper";
import { useEffect, useState } from "react";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hideLayoutPrefixes = [
    "/login",
    "/register",
    "/lupa-kata-sandi",
    "/dashboard",
    "/admin",
    "/perusahaan",
  ];

  const shouldHide = hideLayoutPrefixes.some((path) =>
    pathname.startsWith(path)
  );

  if (!mounted) return null;

  return (
    <>
      {!shouldHide && <Navbar />}
      <main className={!shouldHide ? "pt-20" : ""}>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
