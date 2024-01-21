"use client"
import { dashboardConfig } from "@/config/dashboard";
import  Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen flex-col space-y-6">
        <MainNav />
        <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
            <Footer />
      </div>
    )
}