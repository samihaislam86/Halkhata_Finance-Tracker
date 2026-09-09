import { useState } from "react"
import AppSidebar from "../AppSidebar";


import { Button } from "@/components/ui/button"
import TransferModal from "@/container/Accounts/TransferModal";
import AccountsModal from "@/container/Accounts/AccountsModal";
import AccountsTable from "@/container/Accounts/AccountsTable";

function Accounts() {
    const [editingAccount, setEditingAccount] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)

    function handleAddClick() {
        setEditingAccount(null)
        setIsModalOpen(true)
    }

    function handleEditClick(account) {
        setEditingAccount(account)
        setIsModalOpen(true)
    }

    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 px-6">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold text-2xl italic">My <span className="text-red-500 italic">Account</span></h1>
                        <h6 className="text-red-300 italic text-sm">Manage Your Account</h6>
                    </div>
                    <div className="flex gap-2">
                        
                        <Button
                            onClick={handleAddClick}
                            className="rounded-md px-2 py-2 bg-red-600 text-md mt-4 mb-4 hover:text-red hover:bg-white"
                        >
                            + Add Account
                        </Button>
                        <Button
                            onClick={() => setIsTransferModalOpen(true)}
                            className="rounded-md px-2 py-2 text-md mt-4 mb-4 bg-red-600 hover:text-red hover:bg-white"
                        >
                            Transfer
                        </Button>
                    </div>
                </div>
                <div>
                    <AccountsTable onEditAccount={handleEditClick} />
                </div>

                <AccountsModal
                    account={editingAccount}
                    open={isModalOpen}
                    onOpenChange={(open) => {
                        setIsModalOpen(open)
                        if (!open) setEditingAccount(null)
                    }}
                />

                <TransferModal
                    open={isTransferModalOpen}
                    onOpenChange={setIsTransferModalOpen}
                />
            </div>
        </div>
    )
}

export default Accounts;