import { createSlice } from "@reduxjs/toolkit"


const fixedItemsSlice = createSlice({
    name: "fixedItems",
    initialState: [],
    reducers: {
        addFixedItem: (state, action) => {
            state.push(action.payload)
        },
        updateFixedItem: (state, action) => {
            const { id, updatedFields } = action.payload
            const item = state.find((f) => f.id === id)
            if (item) {
                Object.assign(item, updatedFields)
            }
        },
        deleteFixedItem: (state, action) => {
            return state.filter((f) => f.id !== action.payload)
        },
        setFixedItems: (state, action) => {
            return action.payload
        },
    },
})

export function fetchFixed() {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/fixedItems")
            const data = await response.json()
            dispatch(setFixedItems(data))
        } catch (error) {
            console.error("Failed to fetch fixed:", error)
        }
    }
}

export function createFixed({ name, description, categoryId, target }) {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/fixedItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, categoryId, target }),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(addFixedItem(data))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}


export function editFixed(id, updatedFields) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/fixedItems/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFields),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(updateFixedItem({ id, updatedFields: data }))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function removeFixed(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/fixedItems/${id}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(deleteFixedItem(id))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function payFixedItem(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/fixedItems/${id}/pay`, {
                method: "POST",
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(updateFixedItem({ id, updatedFields: { lastPaidMonth: data.lastPaidMonth } }))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export const { addFixedItem, updateFixedItem, deleteFixedItem, setFixedItems } = fixedItemsSlice.actions
export default fixedItemsSlice.reducer