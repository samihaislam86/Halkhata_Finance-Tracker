import { useContext } from "react"
import { FinanceContext } from "../../context/FinanceContext"

function Details({ type }) {
    const { accounts } = useContext(FinanceContext)
    const filtered = type ? accounts.filter((a) => a.type === type) : accounts
    const total = filtered.reduce((sum, a) => sum + a.balance, 0)

    const label =
        type === "cash" ? "Cash Balance" : type === "bank" ? "Bank Balance" : "Total Balance"

    return (
        <div className="flex justify-between items-center  bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl border shadow-sm px-4 py-4">
            <h1 className="text-xl font-semibold">{label}</h1>
            <div className='font-bold text-2xl'>{total.toFixed(2)}</div>
        </div>
    )
}

export default Details;