import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import ContextProvider from "@/components/contextsprovider";
import SiteNav from "@/components/sitenav";
import TitleBar from "@/components/titlebar";
import { getServerSession } from "next-auth";
import { lookupAddUser } from "./_actions/users";
import { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TaskForge",
  description: "TaskForge: A Lima3 Media App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await getServerSession();
  const userData = await lookupAddUser(
    sessionData?.user?.email!,
    sessionData?.user?.name!
  );

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ContextProvider userData={userData}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-full w-full">
              <div className="w-full m-2 h-1/6 ">
                <Suspense>
                  <TitleBar sessionData={sessionData} userData={userData} />
                </Suspense>
              </div>
              <div className="flex flex-row w-full h-5/6">
                <div className="hidden md:block md:w-1/6">
                  <SiteNav />
                </div>
                <div className="w-full h-full">{children}</div>
              </div>
            </div>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
