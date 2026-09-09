import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import AppSidebar from "../../components/app/AppSidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

function CategoryDetail() {
    const { categoryId } = useParams()
    const navigate = useNavigate()
    const { categories, transactions } = useContext(FinanceContext)

    const category = categories.find((c) => c.id === categoryId)

    if (!category) {
        return <div className="text-white p-6">Category not found.</div>
    }

    const regularExpenses = transactions
    .filter((t) => t.categoryId === categoryId && t.type === "withdraw")
    .sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 px-6">
                <div className="flex flex-row items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold text-2xl italic">{category.name}</h1>
                        <h6 className="text-red-300 italic text-sm">{category.description}</h6>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <Collapsible defaultOpen className="border rounded-lg">
                        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 ">
                            <div className="flex items-center gap-2">
                                <ChevronRight className="w-4 h-4" />
                                <span className="font-semibold">Regular</span>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="px-4 py-3 border-t bg-white/90">
                                {regularExpenses.length === 0 ? (
                                    <p className="text-white/60 mb-3">No regular expenses yet.</p>
                                ) : (
                                    <div className="flex flex-col gap-2 mb-3 ">
                                        {regularExpenses.map((t) => (
                                            <div
                                                key={t.id}
                                                className="flex items-center justify-between py-2 border-b last:border-b-0"
                                            >
                                                <div>
                                                    <div className="font-medium text-black">{t.name}</div>
                                                    <div className="text-sm text-black">
                                                        {new Date(t.date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <span className="text-red-600">-${Number(t.amount).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <div
                        onClick={() => navigate(`/category/${categoryId}/fixed`)}
                        className="w-full flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer hover:bg-white/5"
                    >
                        <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" />
                            <span className="font-semibold">Fixed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDetail