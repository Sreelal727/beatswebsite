import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Beats Medical Equipment Trading L.L.C. | Leading Biomedical Equipment Supplier in Dubai",
  description: "Beats Medical is a leading biomedical equipment supplier based in Dubai with global presence. We specialize in high-quality medical and dental equipment, maintenance, and consultation services.",
  keywords: "medical equipment, dental equipment, biomedical, Dubai, UAE, healthcare, medical devices, dental units, sterilization, ultrasound, cardiology",
  authors: [{ name: "Beats Medical Equipment Trading L.L.C." }],
  openGraph: {
    title: "Beats Medical Equipment Trading L.L.C.",
    description: "Leading Biomedical Equipment Supplier Based in Dubai, With a Global Presence",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
