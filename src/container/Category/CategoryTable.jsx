// container/Category/CategoryTable.jsx
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FinanceContext } from "../../context/FinanceContext"
import TableActions from "../../components/app/TableActions"

function CategoryTable({ onEditCategory }) {
    const { categories, accounts, deleteCategory } = useContext(FinanceContext)

    function handleDelete(id) {
        deleteCategory(id)
    }

    function getAccountName(accountId) {
        const account = accounts.find((a) => a.id === accountId)
        return account ? account.name : "—"
    }

    return (
        <div className="flex flex-col gap-2 mt-6 border rounded-lg">
            {categories.length === 0 ? (
                <div className="px-4 py-8 text-center text-white/60">
                    No categories yet. Click "+ Add Category" to get started.
                </div>
            ) : (
                categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
                    >
                        <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-white/60">
                                {getAccountName(category.accountId)}
                            </div>
                            <Link to={`/category/${category.id}`} className="text-red-600 text-sm">
                                Details
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end gap-1 w-60">
                                <span className="text-sm">
                                    Tk {Number(category.spent || 0).toFixed(2)} / Tk {Number(category.budgetTarget).toFixed(2)}
                                </span>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${
                                            category.spent > category.budgetTarget ? "bg-red-500" : "bg-green-500"
                                        }`}
                                        style={{
                                            width: `${Math.min(((category.spent || 0) / category.budgetTarget) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <TableActions
                                onEdit={() => onEditCategory(category)}
                                onDelete={() => handleDelete(category.id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default CategoryTable