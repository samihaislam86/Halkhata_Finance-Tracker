
import '../../App.css'
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FinanceContext } from "../../context/FinanceContext"
import AppSidebar from "./AppSidebar"

function Dashboard() {
    const { accounts, categories, transactions } = useContext(FinanceContext)

    const assetTypes = ["Cash", "Debit"]
    const liabilityTypes = ["Credit"]

    const totalAssets = accounts
        .filter((a) => assetTypes.includes(a.type))
        .reduce((sum, a) => sum + Number(a.balance || 0), 0)

    const totalLiabilities = accounts
        .filter((a) => liabilityTypes.includes(a.type))
        .reduce((sum, a) => sum + Number(a.balance || 0), 0)

    const netWorth = totalAssets - totalLiabilities

    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 px-6 text-white">
                <div className="mt-4">
                    <h1 className="text-2xl font-semibold italic">Dashboard</h1>
                    <h6 className="text-red-300 italic text-sm">Your financial overview</h6>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                    <div className="border border-white/10 rounded-lg px-6 py-4 flex-1 min-w-[180px]">
                        <div className="text-sm text-white/60">Net Worth</div>
                        <div className="text-2xl font-semibold">${netWorth.toFixed(2)}</div>
                    </div>
                    <div className="border border-white/10 rounded-lg px-6 py-4 flex-1 min-w-[180px]">
                        <div className="text-sm text-white/60">Assets</div>
                        <div className="text-2xl font-semibold text-green-400">${totalAssets.toFixed(2)}</div>
                    </div>
                    <div className="border border-white/10 rounded-lg px-6 py-4 flex-1 min-w-[180px]">
                        <div className="text-sm text-white/60">Liabilities</div>
                        <div className="text-2xl font-semibold text-red-400">${totalLiabilities.toFixed(2)}</div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 border border-white/10 rounded-lg p-4">
                        <h2 className="font-semibold mb-3">Recent Transactions</h2>
                        {recentTransactions.length === 0 ? (
                            <p className="text-white/60 text-sm">No transactions yet.</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {recentTransactions.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between border-b border-white/10 py-2 last:border-b-0">
                                        <div>
                                            <div className="text-sm font-medium">{t.name}</div>
                                            <div className="text-xs text-white/50">
                                                {new Date(t.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <span className={t.type === "deposit" ? "text-green-400" : "text-red-400"}>
                                            {t.type === "deposit" ? "+" : "-"}${Number(t.amount).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/expense" className="text-red-500 text-sm mt-3 inline-block">
                            View all →
                        </Link>
                    </div>

                    <div className="flex-1 border border-white/10 rounded-lg p-4">
                        <h2 className="font-semibold mb-3">Budget Overview</h2>
                        {categories.length === 0 ? (
                            <p className="text-white/60 text-sm">No categories yet.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {categories.map((c) => {
                                    const percent = c.budgetTarget
                                        ? Math.min(((c.spent || 0) / c.budgetTarget) * 100, 100)
                                        : 0
                                    return (
                                        <div key={c.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{c.name}</span>
                                                <span>${Number(c.spent || 0).toFixed(2)} / ${Number(c.budgetTarget).toFixed(2)}</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${c.spent > c.budgetTarget ? "bg-red-500" : "bg-green-500"}`}
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <Link to="/category" className="text-red-500 text-sm mt-3 inline-block">
                            View all →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard