import { createSlice } from "@reduxjs/toolkit"

import { addSpent } from "./categoriesSlice"
import { adjustBalance } from "./AccountSlice"

function loadFromStorage() {
    try {
        const stored = localStorage.getItem("transactions")
        return stored != null ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: loadFromStorage(),
    reducers: {
        addTransactionRecord: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: ({ name, accountId, type, categoryId, amount }) => {
                return {
                    payload: {
                        id: Date.now().toString(),
                        name: name || "Untitled",
                        accountId,
                        type,
                        categoryId: categoryId || null,
                        amount,
                        date: new Date().toISOString(),
                    }
                }
            }
        },
    },
})

export const { addTransactionRecord } = transactionsSlice.actions
export default transactionsSlice.reducer


export function addTransaction({ name, accountId, amount, type, categoryId }) {
    return (dispatch, getState) => {
        const transAmount = Number(amount)

        if (!accountId) {
            return { success: false, message: "Please choose an account." }
        }
        if (!transAmount || transAmount <= 0) {
            return { success: false, message: "Enter a valid amount." }
        }

        const accounts = getState().accounts

        if (type === "withdraw") {
            const account = accounts.find((a) => a.id === accountId)
            if (!account) {
                return { success: false, message: "Invalid account." }
            }
            if (account.balance < transAmount) {
                return { success: false, message: "Insufficient balance in this account." }
            }
        }

        dispatch(adjustBalance({ accountId, amount: transAmount, type }))

        if (type === "withdraw" && categoryId) {
            dispatch(addSpent({ categoryId, amount: transAmount }))
        }

        dispatch(addTransactionRecord({ name, accountId, type, categoryId, amount: transAmount }))

        return { success: true }
    }
}
export function transferMoney({ fromAccountId, toAccountId, amount }) {
    return (dispatch, getState) => {
        const transferAmount = Number(amount)

        if (!fromAccountId || !toAccountId) {
            return { success: false, message: "Please choose both accounts." }
        }
        if (fromAccountId === toAccountId) {
            return { success: false, message: "Cannot transfer to the same account." }
        }
        if (!transferAmount || transferAmount <= 0) {
            return { success: false, message: "Enter a valid amount." }
        }

        const accounts = getState().accounts
        const fromAccount = accounts.find((a) => a.id === fromAccountId)
        if (!fromAccount) {
            return { success: false, message: "Invalid source account." }
        }
        if (fromAccount.balance < transferAmount) {
            return { success: false, message: "Insufficient balance in source account." }
        }

        const toAccount = accounts.find((a) => a.id === toAccountId)

        dispatch(adjustBalance({ accountId: fromAccountId, amount: transferAmount, type: "withdraw" }))
        dispatch(adjustBalance({ accountId: toAccountId, amount: transferAmount, type: "deposit" }))

        dispatch(addTransactionRecord({
            name: `Transfer to ${toAccount?.name || "account"}`,
            accountId: fromAccountId,
            type: "transfer",
            categoryId: null,
            amount: transferAmount,
        }))

        return { success: true }
    }
}