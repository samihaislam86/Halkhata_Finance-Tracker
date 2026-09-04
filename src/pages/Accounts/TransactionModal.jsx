import { Button } from "../../components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useContext, useState } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import { Field, FieldGroup } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useForm } from "react-hook-form"

export function TransactionModal() {
  const { register, handleSubmit, reset, setValue, watch } = useForm()
  const accountType = watch("accountType")
  const { accounts, addAccount, addTransaction } = useContext(FinanceContext)
  const bankAccounts = accounts.filter((a) => a.type === "bank")

  const [selectedBankId, setSelectedBankId] = useState("")
  const [newBankName, setNewBankName] = useState("")

  function onSubmit(data) {
    let accountId = null
    const cashAccount = accounts.find((a) => a.type === "cash")

    if (data.accountType === "cash") {
      accountId = cashAccount ? cashAccount.id : addAccount({ name: "Cash", type: "cash", balance: 0 })
    }

    if (data.accountType === "bank") {
      if (selectedBankId === "newbank") {
        accountId = addAccount({ name: newBankName, type: "bank", balance: 0 })
      } else {
        accountId = selectedBankId
      }
    }

    if (!accountId) {
      alert("Please choose an account")
      return
    }

    const result = addTransaction({
      accountId,
      amount: data.amount,
      type: data.type,
    })

    if (result.success) {
      reset()
      setSelectedBankId("")
      setNewBankName("")
    } else {
      alert(result.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="border rounded-md px-2 py-2 text-blue-800 text-sm mt-4 mb-4 hover:text-white hover:bg-gradient-to-br from-blue-600 to-indigo-700">
        + Add Transaction
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" step="0.01" {...register("amount")} />
            </Field>
            <Field>
              <Label htmlFor="type">Type</Label>
              <Select
                defaultValue="deposit"
                onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdraw">Withdraw</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="accountType">Account</Label>
              <Select onValueChange={(value) => setValue("accountType", value)}>
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                </SelectContent>
              </Select>
              {accountType === "bank" && (
                <Field>
                  <Label htmlFor="bank">Choose Bank</Label>
                  <Select onValueChange={(value) => setSelectedBankId(value)}>
                    <SelectTrigger id="bank">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="newbank">+ Add new bank</SelectItem>
                    </SelectContent>
                  </Select>

                  {selectedBankId === "newbank" && (
                    <Input
                      className="mt-2"
                      placeholder="New bank name"
                      value={newBankName}
                      onChange={(e) => setNewBankName(e.target.value)}
                    />
                  )}
                </Field>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                reset()
                setSelectedBankId("")
                setNewBankName("")
                
              }}
            >Cancel</Button>

            <Button type="submit" variant="outline">Save changes</Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}