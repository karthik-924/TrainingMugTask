import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Provider } from "react-redux";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Training Mug",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="garden">
      <body className={`${inter.className} relative`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
