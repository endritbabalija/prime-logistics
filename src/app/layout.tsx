import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";
import { ThemeProvider } from "@/components/ThemeProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Prime Logistics - Global Shipping Solutions",
  description: "Professional logistics and shipping services worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} font-urbanist antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
