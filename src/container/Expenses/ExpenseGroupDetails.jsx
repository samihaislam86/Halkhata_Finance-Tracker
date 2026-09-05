import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { FinanceContext } from "../../context/FinanceContext"
import ExpenseCategoryCard from "./ExpenseCategoryCard"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/ui/dialog"
import { Button } from "@/components/ui/ui/button"
import { Input } from "@/components/ui/ui/input"
import { Label } from "@/components/ui/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/ui/select"

function ExpenseGroupDetails() {
    const { groupId } = useParams()
    const { expenseGroups, expenseCategories, addExpenseCategory } = useContext(FinanceContext)

    const group = expenseGroups.find((g) => g.id === groupId)
    const categories = expenseCategories.filter((c) => c.groupId === groupId)

    const [name, setName] = useState("")
    const [budget, setBudget] = useState("")
    const [isRecurring, setIsRecurring] = useState(false)
    const [fixedAmount, setFixedAmount] = useState("")

    function resetForm() {
        setName("")
        setBudget("")
        setIsRecurring(false)
        setFixedAmount("")
    }

    function handleAddCategory() {
        if (!name.trim()) return
        addExpenseCategory({
            groupId,
            name: name.trim(),
            budget: isRecurring ? fixedAmount : budget,
            isRecurring,
            fixedAmount,
        })
        resetForm()
    }

    if (!group) {
        return <p className="text-center text-blue-800 mt-8">Group not found.</p>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-800 border px-4 py-2 bg-white mb-4">
                {group.name.toUpperCase()} DETAILS
            </h1>

            <div className="mb-4">
                {categories.map((category) => (
                    <ExpenseCategoryCard key={category.id} category={category} />
                ))}
                {categories.length === 0 && (
                    <p className="text-center text-blue-800 text-sm py-4">No categories yet</p>
                )}
            </div>

            <Dialog onOpenChange={(open) => !open && resetForm()}>
                <DialogTrigger asChild>
                    <Button variant="outline">+ Add Category</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Category to {group.name}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        <div>
                            <Label htmlFor="catName">Name</Label>
                            <Input
                                id="catName"
                                placeholder="e.g. Rent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="recurring">Is this a fixed monthly bill?</Label>
                            <Select
                                onValueChange={(value) => setIsRecurring(value === "yes")}
                            >
                                <SelectTrigger id="recurring">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes — fixed amount every month</SelectItem>
                                    <SelectItem value="no">No — pay anytime, variable amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {isRecurring ? (
                            <div>
                                <Label htmlFor="fixedAmount">Fixed monthly amount</Label>
                                <Input
                                    id="fixedAmount"
                                    type="number"
                                    step="0.01"
                                    value={fixedAmount}
                                    onChange={(e) => setFixedAmount(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <Label htmlFor="budget">Monthly budget</Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    step="0.01"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleAddCategory}>
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ExpenseGroupDetails;