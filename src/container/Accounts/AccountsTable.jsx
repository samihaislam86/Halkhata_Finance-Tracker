import { useContext } from "react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

import { FinanceContext } from "@/context/FinanceContext"
import TableActions from "@/components/app/TableActions"

function AccountsTable({ onEditAccount }) {
    const { accounts, deleteAccount } = useContext(FinanceContext)

    const grouped = accounts.reduce((groups, account) => {
        const key = account.type
        if (!groups[key]) groups[key] = []
        groups[key].push(account)
        return groups
    }, {})

    function handleDelete(id) {
        deleteAccount(id)
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            {accounts.length === 0 ? (
                <div className="border rounded-lg px-4 py-8 text-center text-white/60">
                    No accounts yet. Click "+ Add Account" to get started.
                </div>
            ) : (
                Object.entries(grouped).map(([type, accountsInGroup]) => {
                    const groupTotal = accountsInGroup.reduce(
                        (sum, a) => sum + Number(a.balance || 0),
                        0
                    )
                    return (
                        <Collapsible key={type} defaultOpen className="border rounded-lg">
                            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-2 ">
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="font-semibold">{type}</span>
                                </div>
                                <span className="font-semibold">Tk {groupTotal.toFixed(2)}</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {accountsInGroup.map((account) => (
                                    <div
                                        key={account.id}
                                        className="flex items-center justify-between px-4 py-3 border-t border-black bg-white/90 text-black"
                                    >
                                        <div>
                                            <div className="font-medium">{account.name}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span>Tk {Number(account.balance).toFixed(2)}</span>
                                            <TableActions
                                                onEdit={() => onEditAccount(account)}
                                                onDelete={() => handleDelete(account.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    )
                })
            )}
        </div>
    )
}

export default AccountsTable