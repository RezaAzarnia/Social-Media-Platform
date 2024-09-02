import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Layout from "./_Components/Layout";
import "@/app/_styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "azarnia social media",
  description: "social media created by reza azarnia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <SessionProvider>
            <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
