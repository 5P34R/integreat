import MainNav from '@/components/MainNav'
import { dashboardConfig } from '@/config/dashboard'
import Image from 'next/image'
import { DashboardNav } from '@/components/nav'
import Footer from '@/components/Footer'

export default function Home({children} : any) {
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
