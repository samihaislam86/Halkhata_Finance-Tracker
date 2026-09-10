import { useState, useContext } from "react"


import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { FinanceContext } from "@/context/FinanceContext"

function CategoryModal({ category, open, onOpenChange }) {
    const { accounts, addCategory, updateCategory } = useContext(FinanceContext)
    const [name, setName] = useState(category?.name ?? "")
    const [description, setDescription] = useState(category?.description??"")
    const [accountId, setAccountId] = useState(category?.accountId ??"")
    const [budgetTarget, setBudgetTarget] = useState(category?.budgetTarget??"")

    function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return
        if (!budgetTarget) return
        if (category) {
            updateCategory(category.id, { name, description, accountId, budgetTarget })
        } else {
            addCategory({ name, description, accountId, budgetTarget })
        }
        onOpenChange(false)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="account">Account</Label>
                            <Select value={accountId} onValueChange={setAccountId}>
                                <SelectTrigger id="account">
                                    <SelectValue placeholder="Select account">
                                        {(value) => {
                                            const selected = accounts.find((a) => a.id === value)
                                            return selected ? selected.name : "Select account"
                                        }}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map((a) => (
                                        <SelectItem key={a.id} value={a.id}>
                                            {a.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="budgetTarget">Budget Target</Label>
                            <Input
                                id="budgetTarget"
                                type="number"
                                value={budgetTarget}
                                onChange={(e) => setBudgetTarget(e.target.value)}
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="submit" variant="outline">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryModal