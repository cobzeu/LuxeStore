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
  title: "LuxePakistan | Premium Pakistani Fashion & Clothing",
  description: "Discover premium fashion - shoes, watches, scarves, shawls, and luxury suits. Elevate your style with our curated collection.",
  keywords: "fashion, luxury, shoes, watches, scarf, shawl, suits, premium clothing",
  openGraph: {
    title: "LuxePakistan | Premium Pakistani Fashion & Clothing",
    description: "Discover premium fashion for the modern individual.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          {/* Winter Sale Announcement Bar */}
          <div className="announcement-bar">
            <div className="announcement-content">
              <span className="announcement-icon">❄️</span>
              <span className="announcement-text">
                <strong>SPECIAL WINTER SALE</strong> — Up to 50% Off on Premium Shawls & Suits
              </span>
              <span className="announcement-icon">❄️</span>
            </div>
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
