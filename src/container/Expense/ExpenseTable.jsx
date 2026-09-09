import { FinanceContext } from "@/context/FinanceContext"
import { useContext } from "react"


function formatDateKey(isoString) {
    const d = new Date(isoString)
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function ExpenseTable() {
    const { transactions, categories, accounts } = useContext(FinanceContext)

    // sort newest first
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))

    // group by date
    const grouped = sorted.reduce((groups, t) => {
        const key = formatDateKey(t.date)
        if (!groups[key]) groups[key] = []
        groups[key].push(t)
        return groups
    }, {})

    function getCategoryName(id) {
        const c = categories.find((c) => c.id === id)
        return c ? c.name : "—"
    }

    function getAccountName(id) {
        const a = accounts.find((a) => a.id === id)
        return a ? a.name : "—"
    }

    return (
        <div className="flex flex-col gap-6 mt-6">
            {Object.entries(grouped).map(([date, items]) => {
                const dayTotal = items.reduce((sum, t) => sum + Number(t.amount), 0)

                return (
                    <div key={date}>
                        <div className="flex justify-between text-sm text-white/60 mb-2 px-1">
                            <span>{date}</span>
                            <span>${dayTotal.toFixed(2)}</span>
                        </div>
                        <div className="border rounded-lg ">
                            {items.map((t) => (
                                <div
                                    key={t.id}
                                    className="flex items-center justify-between bg-white/10 px-4 py-3 border-b last:border-b-0"
                                >
                                    <div>
                                        <div className="font-medium">{t.name}</div>
                                        <div className="text-sm text-white/60">
                                            {getCategoryName(t.categoryId)} · {getAccountName(t.accountId)}
                                        </div>
                                    </div>
                                    <span className="text-red-600">-${Number(t.amount).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ExpenseTable