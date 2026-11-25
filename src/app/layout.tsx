import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "MentorChess — Juega, aprende y piensa como jugador de ajedrez",
  description:
    "Juega contra bots de 100 a 3500 de Elo, aprende aperturas y deja que un entrenador te explique tus errores.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#262522",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Nav />
        <main className="pb-20 sm:pb-8">{children}</main>
      </body>
    </html>
  );
}
