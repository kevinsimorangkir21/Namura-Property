import "../globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0b0f15] transition-colors duration-500">
        <ClientLayoutWrapper>
          <NavbarWrapper />
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
