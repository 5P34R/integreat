import MainNav from '@/components/MainNav'
import { dashboardConfig } from '@/config/dashboard'
import Image from 'next/image'
import { DashboardNav } from '@/components/nav'
import Footer from '@/components/Footer'

export default function ScheduleLayout({children} : any) {

    return (
      <div className="flex min-h-screen flex-col space-y-6">
            <MainNav items={dashboardConfig.mainNav} />
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.HospitalsidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
            <Footer />
      </div>
    )
}
