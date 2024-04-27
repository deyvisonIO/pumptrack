import { Header, HeaderSkeleton } from "@/components/header";
import { Suspense } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-slate-100 h-screen">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
    </div>
  )
}
