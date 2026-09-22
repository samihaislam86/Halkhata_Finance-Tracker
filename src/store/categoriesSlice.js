import { createSlice } from "@reduxjs/toolkit"

function loadFromStorage() {
    try {
        const stored = localStorage.getItem("categories")
        return stored != null ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState: loadFromStorage(),
    reducers: {
        addCategory: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: ({ name, description, accountId, budgetTarget }) => {
                return {
                    payload: {
                        id: Date.now().toString(),
                        name,
                        description: description || "",
                        accountId: accountId || null,
                        budgetTarget: Number(budgetTarget) || 0,
                        spent: 0,
                    }
                }
            }
        },
        updateCategory: (state, action) => {
            const { id, updatedFields } = action.payload
            const category = state.find((c) => c.id === id)
            if (category) {
                Object.assign(category, updatedFields)
            }
        },
        deleteCategory: (state, action) => {
            return state.filter((c) => c.id !== action.payload)
        },
        addSpent: (state, action) => {
            const { categoryId, amount } = action.payload
            const category = state.find((c) => c.id === categoryId)
            if (category) {
                category.spent = (category.spent || 0) + amount
            }
        },
    },
})

export const { addCategory, updateCategory, deleteCategory, addSpent } = categoriesSlice.actions
export default categoriesSlice.reducer