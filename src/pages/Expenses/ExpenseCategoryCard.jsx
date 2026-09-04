import { useContext, useState } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function ExpenseCategoryCard({ category }) {
    const { accounts, addRecurringCategory, addTransaction } = useContext(FinanceContext)
    const [amount, setAmount] = useState("")
    const [selectedAccountId, setSelectedAccountId] = useState("")
    const [error, setError] = useState("")

    const percent = category.budget > 0 ? Math.min((category.spent / category.budget) * 100, 100) : 0
    const isOverBudget = category.spent >= category.budget

    const currentMonth = new Date().toISOString().slice(0, 7)
    const alreadyPaidThisMonth = category.lastPaidMonth === currentMonth

    function handlePay() {
        if (!selectedAccountId) {
            setError("Choose an account first.")
            return
        }
        const result = category.isRecurring
            ? addRecurringCategory({ categoryId: category.id, accountId: selectedAccountId })
            : addTransaction({ accountId: selectedAccountId, amount, type: "withdraw", categoryId: category.id })

        if (result.success) {
            setAmount("")
            setError("")
        } else {
            setError(result.message)
        }
    }

    return (
        <div className="border rounded-lg px-4 py-3 mb-2 bg-white ">
            <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-blue-800">{category.name}</p>
                {category.isRecurring ? (
                    <p className="text-sm text-gray-500">${category.fixedAmount.toFixed(2)} / month</p>
                ) : (
                    <p className={`text-sm ${isOverBudget ? "text-red-500" : "text-gray-500"}`}>
                        ${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}
                    </p>
                )}
            </div>

            {!category.isRecurring && (
                <div className="mb-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-600"}`}
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{percent.toFixed(0)}% of budget used</p>
                </div>
            )}

            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

            {category.isRecurring ? (
                alreadyPaidThisMonth ? (
                    <span className="text-sm text-green-600 font-medium">Paid this month</span>
                ) : (
                    <div className="flex items-center gap-2">
                        <Select onValueChange={setSelectedAccountId}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Account" />
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((a) => (
                                    <SelectItem key={a.id} value={a.id}>
                                        {a.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="bg-blue-800 text-white hover:text-white hover:bg-indigo-500 " size="sm" onClick={handlePay}>
                            Pay {category.name}
                        </Button>
                    </div>
                )
            ) : (
                <div className="flex items-center gap-2">
                    <Select onValueChange={setSelectedAccountId}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((a) => (
                                <SelectItem key={a.id} value={a.id}>
                                    {a.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        className="w-24"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button  className="bg-blue-800 text-white hover:text-white hover:bg-indigo-500 "  size="sm" onClick={handlePay}>
                        Pay
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ExpenseCategoryCard;