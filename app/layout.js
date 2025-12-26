import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "LUXE Fashion | Premium Clothing & Accessories",
  description: "Discover premium fashion - shoes, watches, scarves, shawls, and luxury suits. Elevate your style with our curated collection.",
  keywords: "fashion, luxury, shoes, watches, scarf, shawl, suits, premium clothing",
  openGraph: {
    title: "LUXE Fashion | Premium Clothing & Accessories",
    description: "Discover premium fashion for the modern individual.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
