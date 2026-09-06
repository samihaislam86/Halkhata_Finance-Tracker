import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import TransactionChart from "@/components/app/TransactionChart"

function MonthlyTransaction() {
    const { transactions } = useContext(FinanceContext)

    const monthlyTotals = {}

    transactions
        .filter((t) => t.type === "withdraw")
        .forEach((t) => {
            const month = new Date(t.date).toLocaleDateString(undefined, { month: "short", year: "numeric" })
            monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount
        })

    const data = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }))

    return <TransactionChart data={data} />
}

export default MonthlyTransaction