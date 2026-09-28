import { createSlice } from "@reduxjs/toolkit";

const accountsSlice = createSlice({
    name: "accounts",
    initialState: [],
    reducers: {
        addAccount: (state, action) => {
            state.push(action.payload)
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
        setAccounts: (state, action) => {
            return action.payload
        },
    }
})

export function fetchAccounts() {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/accounts")
            const data = await response.json()
            dispatch(setAccounts(data))
        } catch (error) {
            console.error("Failed to fetch accounts:", error)
        }
    }
}

export function createAccount({ name, type, balance }) {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, type, balance }),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(addAccount(data))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function editAccount(id, updatedFields) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/accounts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFields),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(updateAccount({ id, updatedFields: data }))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function removeAccount(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/accounts/${id}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(deleteAccount(id))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export const { addAccount, updateAccount, deleteAccount, adjustBalance, setAccounts } = accountsSlice.actions
export default accountsSlice.reducer