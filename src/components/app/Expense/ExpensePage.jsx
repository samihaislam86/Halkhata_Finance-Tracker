import { useState } from "react";
import AppSidebar from "../AppSidebar";
import ExpenseModal from "../../../container/Expense/ExpenseModal";
import ExpenseTable from "../../../container/Expense/ExpenseTable";
import { Button } from "@/components/ui/button";
function ExpensePage() {
    const [editingExpense, setEditingExpense] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleAddClick() {
        setEditingExpense(null)
        setIsModalOpen(true)
    }

    function handleEditClick(account) {
        setEditingExpense(account)
        setIsModalOpen(true)
    }

    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 px-6">

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold text-2xl italic">My<span className="text-red-500 italic">Expenses</span></h1>
                        <h6 className="text-red-300 italic text-sm">Manage Your Expenses</h6>
                    </div>
                    <Button
                        onClick={handleAddClick}
                        className="rounded-md px-2 py-2 bg-red-600 text-md mt-4 mb-4 hover:text-red hover:bg-white"
                    >
                        + Add Expense
                    </Button>
                </div>
                <div>
                    <ExpenseTable onEditAccount={handleEditClick} />

                </div>
                <ExpenseModal
                    expense={editingExpense}
                    open={isModalOpen}
                    onOpenChange={(open) => {
                        setIsModalOpen(open)
                        if (!open) setEditingExpense(null)
                    }} />

            </div>


        </div>


    )
}

export default ExpensePage;