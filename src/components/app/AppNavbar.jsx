import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

function AppNavbar() {
    return (
        <nav className="w-full flex items-center justify-between px-2 py-2 border-white/10 rounded-xl">
            <span className="text-white font-semibold text-lg italic">
                Money<span className="text-red-500 italic">Plant</span>
            </span>

            <NavigationMenu>
                <NavigationMenuList asChild>
                    <NavigationMenuItem>
                        <NavigationMenuLink >
                            <Link to="/" className="text-white/80 hover:text-black text-sm">
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink >
                            <Link to="/dashboard" className="text-white/80 hover:text-black text-sm">
                                Dashboard
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink >
                            <Link to="/accounts" className="text-white/80 hover:text-black text-sm">
                                My Accounts
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuLink >
                            <Link to="/category" className="text-white/80 hover:text-black text-sm">
                                Category
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/expense" className="text-white/80 hover:text-black text-sm">
                                My Expenses
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-medium">
                A
            </div>
        </nav>
    )
}

export default AppNavbar