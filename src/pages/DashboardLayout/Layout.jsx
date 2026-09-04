import { SidebarProvider} from "@/components/ui/sidebar"
import AppSidebar from "./AppSidebar"

import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Layout