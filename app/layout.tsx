import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  title: "Eventix - Event Management Platform",
  description: "Discover and manage events with Eventix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
