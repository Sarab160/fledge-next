import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Fledge",
  description: "Smart Quiz Builder",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-gray-800">
        {children}
      </body>
    </html>
  );
}
