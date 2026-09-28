import { createSlice } from "@reduxjs/toolkit"
import { fetchAccounts } from "./AccountSlice"

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: [],
    reducers: {
        addTransactionRecord: (state, action) => {
            state.push(action.payload)
        },
        setTransactions: (state, action) => {
            return action.payload
        },
    },
})

export const { addTransactionRecord, setTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer

export function fetchTransactions() {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/transactions")
            const data = await response.json()
            dispatch(setTransactions(data))
        } catch (error) {
            console.error("Failed to fetch transactions:", error)
        }
    }
}

export function addTransaction({ name, accountId, amount, type, categoryId }) {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, accountId, amount, type, categoryId }),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(addTransactionRecord(data))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function transferMoney({fromAccountId, toAccountId, amount}){
    return async (dispatch)=> {
        try {
            const response= await fetch("http://localhost:3000/transactions/transfer",{
                method:"POST",
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({fromAccountId, toAccountId, amount}),
            })
            const data = await response.json()
            if (!response.ok){
                return {success:false, message:data.message}
            }
            dispatch (fetchAccounts(data))
            return{success:true}
        }catch(error){
            return {success:false, message:"Could not connect to server"}

        }
    }

}