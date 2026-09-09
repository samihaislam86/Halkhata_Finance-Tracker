import { useState, useContext, useEffect } from "react"


import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { FinanceContext } from "@/context/FinanceContext"

function AccountsModal({ account, open, onOpenChange }) {

    const { addAccount, updateAccount } = useContext(FinanceContext)
    const [name, setName] = useState("")
    const [type, setType] = useState("Cash")
    const [balance, setBalance] = useState("")

    useEffect(() => {
        if (account) {
            setName(account.name)
            setType(account.type)
            setBalance(account.balance)
        } else {
            setName("")
            setType("Cash")
            setBalance("")
        }
    }, [account])

    function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return

        if (account) {

            updateAccount(account.id, { name, type, balance })

        } else {
            addAccount({ name, type, balance })
        }

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{account ? "Edit Account" : "Add New Account"}</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Account Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="type">Account Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Debit">Debit</SelectItem>
                                    <SelectItem value="Credit">Credit</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="balance">Initial Balance</Label>
                            <Input
                                id="balance"
                                type="number"
                                min="0"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="0"
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

export default AccountsModal