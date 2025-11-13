import "../globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "Namura Property",
  description: "Temukan properti impian Anda dengan mudah",
  icons: {
    icon: "/NP TP S.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="
          bg-white 
          dark:bg-[#0b0f15] 
          text-gray-900 
          dark:text-gray-100 
          antialiased 
          transition-colors 
          duration-500
        "
      >
        <ClientLayoutWrapper>
          <NavbarWrapper />

          <main className="min-h-screen">
            {children}
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
