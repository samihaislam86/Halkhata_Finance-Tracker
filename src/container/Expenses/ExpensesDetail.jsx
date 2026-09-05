import { useContext, useState } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import CategoryCard from "@/components/ui/app/CategoryCard"
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

function ExpensesDetail() {
    const { expenseGroups, addExpenseGroup } = useContext(FinanceContext)
    const [newGroupName, setNewGroupName] = useState("")

    function handleAddGroup() {
        if (!newGroupName.trim()) return
        addExpenseGroup({ name: newGroupName.trim() })
        setNewGroupName("")
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-800 border px-4 py-2 bg-white mb-4">
                EXPENSES
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {expenseGroups.map((group) => (
                    <CategoryCard key={group.id} id={group.id} name={group.name} />
                ))}
            </div>

            <Dialog onOpenChange={(open) => !open && setNewGroupName("")}>
                <DialogTrigger asChild>
                    <Button variant="outline">+ Add Group</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Expense Group</DialogTitle>
                    </DialogHeader>
                    <div className="py-2">
                        <Label htmlFor="groupName">Group name</Label>
                        <Input
                            id="groupName"
                            placeholder="e.g. Home"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={() => setNewGroupName("")}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleAddGroup}>
                                Save Changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ExpensesDetail;