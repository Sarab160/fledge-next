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
      <head>
        <style>{`
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </head>

      <body className="bg-white font-sans text-gray-800">
        {children}
      </body>
    </html>
  );
}
