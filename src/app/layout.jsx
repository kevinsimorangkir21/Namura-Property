import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import MaintenancePage from "./maintenance";

export const metadata = {
  title: "Namura Property - Temukan Properti Impianmu dengan Mudah",
  description:
    "Platform properti digital yang membantu kamu menemukan, mengiklankan, dan membandingkan properti terbaik di Indonesia.",
  keywords: [
    "Namura Property",
    "Properti Indonesia",
    "Cari Rumah",
    "KPR",
    "Agen Properti",
    "Tanah Dijual",
  ],
  authors: [{ name: "Namura Property Team" }],
  openGraph: {
    title: "Namura Property - Platform Properti Terpercaya",
    description:
      "Temukan rumah impianmu dan nikmati fitur lengkap seperti KPR kalkulator, pencarian properti, dan konsultasi agen terpercaya.",
    url: "https://namuraproperty.com",
    siteName: "Namura Property",
    images: [
      {
        url: "/NP TP S.png",
        width: 1200,
        height: 630,
        alt: "Namura Property OG Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namura Property - Platform Properti Terpercaya",
    description:
      "Temukan properti terbaik dan kelola iklanmu dengan mudah bersama Namura Property.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/NP TP S.ico",
    shortcut: "/NP TP S.ico",
    apple: "/NP TP S.png",
    other: [
      {
        rel: "icon",
        url: "/NP TP S.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  const maintenanceMode = false;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#00ccb0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-[#0b0f15] dark:text-gray-100 transition-colors duration-500">
        {maintenanceMode ? (
          <MaintenancePage />
        ) : (
          <ClientLayoutWrapper>
            <Navbar />
            {children}
          </ClientLayoutWrapper>
        )}
      </body>
    </html>
  );
}
