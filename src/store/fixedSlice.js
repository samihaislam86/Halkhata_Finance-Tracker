import { createSlice } from "@reduxjs/toolkit"

function loadFromStorage() {
    try {
        const stored = localStorage.getItem("fixedItems")
        return stored != null ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const fixedItemsSlice = createSlice({
    name: "fixedItems",
    initialState: loadFromStorage(),
    reducers: {
        addFixedItem: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: ({ name, description, categoryId, target }) => {
                return {
                    payload: {
                        id: Date.now().toString(),
                        name,
                        description: description || "",
                        categoryId,
                        target: Number(target) || 0,
                    }
                }
            }
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
    },
})

export const { addFixedItem, updateFixedItem, deleteFixedItem } = fixedItemsSlice.actions
export default fixedItemsSlice.reducer