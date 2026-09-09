// components/RowActions.jsx
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

function TableActions({ onEdit, onDelete }) {
    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="ghost"
                onClick={onEdit}
                className="text-red-500 hover:text-white hover:bg-red-600"
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                className="text-red-400 hover:text-red-600"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    )
}

export default TableActions