import { useContext } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import TransTable from "../../components/app/Table"

function TransactionTable({ type }) {
    const { accounts, transactions } = useContext(FinanceContext)

    const relevantAccounts = accounts.filter((a) => a.type === type)
    const accountIds = relevantAccounts.map((a) => a.id)

    const filteredTransactions = transactions
        .filter((t) => accountIds.includes(t.accountId))
        .map((t) => {
            const account = relevantAccounts.find((a) => a.id === t.accountId)
            return { ...t, accountName: account ? account.name : "Unknown" }
        })

    return <TransTable transactions={filteredTransactions} showAccountName={type === "bank"} />
}

export default TransactionTable;