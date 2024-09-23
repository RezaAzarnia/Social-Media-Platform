import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Layout from "./_Components/Layout";
import "@/app/_styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import SWRProvider from "./_Components/SWRProvider";
import { LayoutProvider } from "./_Components/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnappGram | Connect and Share with Friends",
  description:
    "Join SnappGram, a vibrant social media platform by Reza Azarnia, where you can connect, share, and discover amazing content with friends and the world.",
    robots: { index: true, follow: true },

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
        {/* session provider for session of auth js  */}
        <SessionProvider>
          {/* SWR for the cache handling */}
          <SWRProvider>
            {/* layout provider is for the close sidebar in the notfound page */}
            <LayoutProvider>
              <Layout>{children}</Layout>
            </LayoutProvider>
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
