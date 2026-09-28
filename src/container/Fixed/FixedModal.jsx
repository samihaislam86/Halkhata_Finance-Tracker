import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { createFixed, editFixed } from "@/store/fixedSlice"

function FixedModal({ fixedItem, open, onOpenChange }) {
    const categories = useSelector((state) => state.categories)
    const dispatch = useDispatch()
    const [name, setName] = useState(fixedItem?.name ?? "")
    const [description, setDescription] = useState(fixedItem?.description ?? "")
    const [categoryId, setCategoryId] = useState(fixedItem?.categoryId ?? "")
    const [target, setTarget] = useState(fixedItem?.target ?? "")

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return
        if (!categoryId) return

        let result
        if (fixedItem) {
            result = await dispatch(editFixed(fixedItem.id, { name, description, categoryId, target }))
        } else {
            result = await dispatch(createFixed({ name, description, categoryId, target }))
        }

        if (!result.success) {
            alert(result.message)
            return
        }
        onOpenChange(false)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{fixedItem ? "Edit Fixed Item" : "Add Fixed Item"}</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
                        <Field>
                            <Label htmlFor="target">Target Amount</Label>
                            <Input id="target" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
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

export default FixedModal