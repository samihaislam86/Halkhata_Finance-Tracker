import { useState, useContext } from "react"


import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { FinanceContext } from "@/context/FinanceContext"

function TransferModal({ open, onOpenChange }) {
    const { accounts, transferMoney } = useContext(FinanceContext)
    const [fromAccountId, setFromAccountId] = useState("")
    const [toAccountId, setToAccountId] = useState("")
    const [amount, setAmount] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        const result = transferMoney({ fromAccountId, toAccountId, amount })

        if (!result.success) {
            alert(result.message)
            return
        }

        setFromAccountId("")
        setToAccountId("")
        setAmount("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Transfer Money</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="from">From Account</Label>
                            <Select value={fromAccountId} onValueChange={setFromAccountId}>
                                <SelectTrigger id="from">
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
                        <Field>
                            <Label htmlFor="to">To Account</Label>
                            <Select value={toAccountId} onValueChange={setToAccountId}>
                                <SelectTrigger id="to">
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
                        <Field>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="submit" variant="outline">Transfer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TransferModal