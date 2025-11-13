// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Namura Property",
  description: "Find your dream property easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0b0f15] transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
