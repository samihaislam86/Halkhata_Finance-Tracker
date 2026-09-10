import { Link, useLocation } from "react-router-dom"

const NAV_ITEMS = [
    {label: "Home", path:"/"},
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Accounts", path: "/accounts" },
    { label: "Category", path: "/category" },
    { label: "My Expenses", path: "/expense" },
    
]

function AppSidebar() {
    const location = useLocation()

    return (
        <aside className="h-screen w-56 flex flex-col px-2 py-4 bg-zinc-900">
            <span className="text-white font-semibold text-lg italic px-2 mb-6">
                Money<span className="text-red-500 italic">Plant</span>
            </span>

            <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`text-sm px-2 py-2 rounded-lg ${
                            location.pathname === item.path
                                ? "bg-red-600 text-white"
                                : "text-white/80 hover:text-white hover:bg-red-600"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </aside>
    )
}

export default AppSidebar