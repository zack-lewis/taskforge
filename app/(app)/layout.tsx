import SiteNav from "@/components/sitenav";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="hidden md:block md:w-1/6">
        <SiteNav />
      </div>
      <div className="w-full md:w-5/6"> {children}</div>
    </div>
  );
}
