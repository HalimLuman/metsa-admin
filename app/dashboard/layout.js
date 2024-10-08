"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav"; // Import MobileNav component

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex max-lg:flex-col min-h-screen`}>
        {/* Mobile Navigation */}
          <MobileNav />
          <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col min-h-screen justify-between w-full">
          {children}
          <div className="w-full bg-gray-100 p-3 flex justify-center border-t">
            <span className="text-gray-500 text-sm">
              © Designed and developed by Luman Software 2024
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout