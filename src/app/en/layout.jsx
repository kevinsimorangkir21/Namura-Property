import "../globals.css";
import NavbarEN from "@/components/ui/en/NavbarEN";
import FooterWrapper from "@/components/FooterWrapper";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "Namura Property - Find Your Dream Property Easily",
  description:
    "Discover your ideal property with Namura Property. Smart search, guides, agents and more.",
  icons: {
    icon: "/NP TP S.ico",
  },
};

export default function RootLayoutEN({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          bg-white 
          text-gray-900 
          dark:bg-[#0b0f15] 
          dark:text-gray-100 
          antialiased
          transition-colors 
          duration-500
        "
      >
        <ClientLayoutWrapper>
          <NavbarEN />

          <main className="min-h-screen">
            {children}
          </main>

          <FooterWrapper />
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
