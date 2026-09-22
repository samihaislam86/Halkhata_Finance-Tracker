import { createSlice } from "@reduxjs/toolkit";

function loadStorage() {
    try {
        const stored = localStorage.getItem("accounts")
        return stored != null ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const accountsSlice = createSlice({
    name: "accounts",
    initialState: loadStorage(),
    reducers: {
        addAccount: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: ({ name, type, balance }) => {
                return {
                    payload: {
                        id: Date.now().toString(),
                        name,
                        type,
                        balance: Number(balance) || 0
                    }
                }
            }
        },
        updateAccount: (state, action) => {
            const { id, updatedFields } = action.payload;
            const account = state.find((a) => a.id === id)
            if (account) {
                Object.assign(account, updatedFields)
            }
        },
        deleteAccount: (state, action) => {
            return state.filter((a) => a.id !== action.payload)
        },
        adjustBalance: (state, action) => {
            const { accountId, amount, type } = action.payload
            const account = state.find((a) => a.id === accountId)
            if (account) {
                account.balance = type === "withdraw" ? account.balance - amount : account.balance + amount
            }
        },
    }
})

export function createAccount({ name, type, balance }) {
    return (dispatch, getState) => {
        const accounts = getState().accounts
        const nameExists = accounts.some(
            (a) => a.name.trim().toLowerCase() === name.trim().toLowerCase()
        )
        if (nameExists) {
            return { success: false, message: "An account with this name already exists." }
        }

        dispatch(addAccount({ name, type, balance }))
        return { success: true }
    }
}

export function editAccount(id, updatedFields) {
    return (dispatch, getState) => {
        if (updatedFields.name) {
            const accounts = getState().accounts
            const nameExists = accounts.some(
                (a) => a.id !== id && a.name.trim().toLowerCase() === updatedFields.name.trim().toLowerCase()
            )
            if (nameExists) {
                return { success: false, message: "An account with this name already exists." }
            }
        }

        dispatch(updateAccount({ id, updatedFields }))
        return { success: true }
    }
}

export const { addAccount, updateAccount, deleteAccount, adjustBalance } = accountsSlice.actions
export default accountsSlice.reducer