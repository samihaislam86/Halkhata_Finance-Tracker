import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import AppSidebar from "../AppSidebar"
import { Button } from "@/components/ui/button"
import TableActions from "../TableActions"
import FixedModal from "@/container/Fixed/FixedModal"
import { fetchFixed, removeFixed, payFixedItem } from "@/store/fixedSlice"

function FixedPage() {
    const { categoryId } = useParams()
    const categories = useSelector((state) => state.categories)
    const fixedItems = useSelector((state) => state.fixedItems)
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingFixedItem, setEditingFixedItem] = useState(null)

    useEffect(() => {
        dispatch(fetchFixed())
    }, [dispatch])

    const category = categories.find((c) => c.id === categoryId)
    const categoryFixedItems = fixedItems.filter((f) => f.categoryId === categoryId)

    function handleAddClick() {
        setEditingFixedItem(null)
        setIsModalOpen(true)
    }

    function handleEditClick(item) {
        setEditingFixedItem(item)
        setIsModalOpen(true)
    }

    async function handleDelete(id) {
        const result = await dispatch(removeFixed(id))
        if (!result.success) {
            alert(result.message)
        }
    }

    function getCurrentMonthKey() {
        const now = new Date()
        return `${now.getFullYear()}-${now.getMonth() + 1}`
    }

    async function handlePay(item) {
        const result = await dispatch(payFixedItem(item.id))
        if (!result.success) {
            alert(result.message)
        }
    }

    if (!category) {
        return <div className="text-white p-6">Category not found.</div>
    }

    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 px-6">
                <div className="flex flex-row items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold text-2xl italic">
                            {category.name} <span className="text-red-500 italic">Fixed</span>
                        </h1>
                        <h6 className="text-red-300 italic text-sm">Recurring items for this category</h6>
                    </div>
                    <Button
                        onClick={handleAddClick}
                        className="rounded-md px-2 py-2 bg-red-600 text-md hover:bg-white hover:text-red-600"
                    >
                        + Add Fixed Item
                    </Button>
                </div>

                <div className="flex flex-col gap-2 mt-6 border rounded-lg">
                    {categoryFixedItems.length === 0 && (
                        <p className="text-white/60 px-4 py-3">No fixed items yet.</p>
                    )}
                    {categoryFixedItems.map((item) => {
                        const currentMonth = getCurrentMonthKey()
                        const isPaid = item.lastPaidMonth === currentMonth

                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
                            >
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-white/60">{item.description}</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span>${Number(item.target).toFixed(2)}</span>
                                    <Button
                                        size="sm"
                                        onClick={() => handlePay(item)}
                                        disabled={isPaid}
                                        className={isPaid ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
                                    >
                                        {isPaid ? "Paid" : "Pay"}
                                    </Button>
                                    <TableActions
                                        onEdit={() => handleEditClick(item)}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <FixedModal
                    key={editingFixedItem ? editingFixedItem.id : "new"}
                    fixedItem={editingFixedItem}
                    open={isModalOpen}
                    onOpenChange={(open) => {
                        setIsModalOpen(open)
                        if (!open) setEditingFixedItem(null)
                    }}
                />
            </div>
        </div>
    )
}

export default FixedPage