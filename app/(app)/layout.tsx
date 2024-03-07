import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Menu from "@/components/menu";
import Sitehead from "@/components/sitehead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Taskforge",
  description: "A Lima3 Concepts App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-100 border border-blue-800 mx-4 mt-4 px-4 py-2 rounded-xl h-32 lg:h-48">
        <Sitehead />
      </div>
      <div className="w-100 px-4 py-2 mx-4 my-2 h-12 border rounded-lg border-blue-800">
        <Menu />
      </div>
      <div className="w-100 border border-blue-800 mx-4 mb-4 px-4 py-2 rounded-xl h-1/6 flex flex-col flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
