import { Link } from "react-router-dom"
import ExpenseChart from "../../components/app/ExpenseChart"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"

function DashboardExpCard() {
    const { expenseGroups, expenseCategories } = useContext(FinanceContext)

    const data = expenseGroups.map((group) => {
        const total = expenseCategories
            .filter((c) => c.groupId === group.id)
            .reduce((sum, c) => sum + c.spent, 0)
        return { name: group.name, value: total }
    })

    return (
        <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="mb-2 bg-white rounded-xl border shadow-xl px-4 py-4">
                <div className="text-xl py-5 font-semibold text-blue-800">
                    <Link to="/expense">Expenses by category</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <ExpenseChart data={data} />
                </div>
            </div>
        </div>
    )
}

export default DashboardExpCard