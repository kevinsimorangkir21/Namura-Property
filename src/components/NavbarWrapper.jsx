"use client";

import { usePathname } from "next/navigation";

// Import Navbar ID & EN dengan nama berbeda
import NavbarID from "@/components/ui/id/NavbarID";
import NavbarEN from "@/components/ui/en/NavbarEN";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const isID = pathname.startsWith("/id");

  return isID ? <NavbarID /> : <NavbarEN />;
}
