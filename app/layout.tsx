import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NetworX - AI-Powered Cyber Decision Intelligence Platform",
  description: "Next-generation Cyber Decision Platform for predictive threat intelligence, cyber twin topology, attack vector tracing, and AI copilot response strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#06080d] text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
