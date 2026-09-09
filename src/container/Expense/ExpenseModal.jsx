import { useState, useContext, useEffect } from "react"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { FinanceContext } from "@/context/FinanceContext"

function ExpenseModal({ open, onOpenChange }) {
    const { accounts, categories, addTransaction } = useContext(FinanceContext)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [accountId, setAccountId] = useState("")
    const selectedCategory = categories.find((c) => c.id === categoryId)
    const categoryHasAccount = Boolean(selectedCategory?.accountId)

    useEffect(() => {
    const category = categories.find((c) => c.id === categoryId)
    if (category?.accountId) {
        setAccountId(category.accountId)
    } else {
        setAccountId("")
    }
}, [categoryId, categories])

    function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim() || !amount) return
        if (!accountId) {
            alert("Please choose an account.")
            return
        }

        const result = addTransaction({
            name,
            accountId,
            amount,
            type: "withdraw",
            categoryId: categoryId || null,
        })

        if (!result.success) {
            alert(result.message)
            return
        }

        setName("")
        setAmount("")
        setCategoryId("")
        setAccountId("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Expense</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Field>
                        <Field>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        </Field>
                        <Field>
                            <Label htmlFor="category">Category</Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category">
                                        {(value) => {
                                            const selected = categories.find((c) => c.id === value)
                                            return selected ? selected.name : "Select category"
                                        }}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {!categoryHasAccount && (
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
                                            <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}

                        {categoryHasAccount && (
                            <p className="text-sm text-white/60">
                                This will be paid from: <span className="text-white">{accounts.find(a => a.id === selectedCategory.accountId)?.name}</span>
                            </p>
                        )}
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="submit" variant="outline">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseModal