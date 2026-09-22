import { createSlice } from "@reduxjs/toolkit"

const categoriesSlice = createSlice({
    name: "categories",
    initialState: [],
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
        setCategories: (state, action) => {
            return action.payload
        },
    },
})

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/categories")
            const data = await response.json()
            dispatch(setCategories(data))
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        }
    }
}

export function createCategory({ name, description, accountId, budgetTarget }) {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, accountId, budgetTarget }),
            })
            const data = await response.json()
            if (!response.ok) {
                return { success: false, message: data.message }
            }
            dispatch(addCategory(data))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function editCategory(id, updatedFields) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFields),
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(updateCategory({ id, updatedFields: data }))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export function removeCategory(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/categories/${id}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                return { success: false, message: data.message }
            }

            dispatch(deleteCategory(id))
            return { success: true }
        } catch (error) {
            return { success: false, message: "Could not connect to server." }
        }
    }
}

export const { addCategory, updateCategory, deleteCategory, addSpent, setCategories } = categoriesSlice.actions
export default categoriesSlice.reducer