import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "react-router-dom"
function AppSidebar() {
    return (
        <div>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex flex-row items-center justify-between border border-gray-200 mb-2 px-4 py-2 rounded-xl ">
                        <img src="/logo.jpeg" alt="Logo" className="w-6 h-6 mr-2" />
                        
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Link to="/">Dashboard</Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <Link to="/accounts">Accounts</Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <Link to="/expense">Expenses</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuButton>
                            <h1>About</h1>
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <h1>Settings</h1>
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <h1>Help</h1>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>

    )
}

export default AppSidebar;