const { categories } = require("../data/store")


function getAllCategories(){
    return categories
}

function createCategories({name, description, accountId,budgetTarget}){

    const nameExists = categories.some(
        (a) => a.name.toLowerCase() === name.toLowerCase()
    )
    if (nameExists) {
        const error = new Error("An category with this name already exists.")
        error.statusCode = 400
        throw error
    }

    const newCategory = {
    id: Date.now().toString(),
    name,
    description: description || "",
    accountId: accountId || null,
    budgetTarget: Number(budgetTarget) || 0,
    spent: 0,
}

    categories.push(newCategory)
    return newCategory

}

function updateCategories(id,{ name, description, accountId, budgetTarget } ) {

    const category = categories.find((c) => c.id === id)
    if (!category) {
        const error = new Error("Category not found")
        error.statusCode = 400
        throw error
    }

    if (name) category.name = name
    if (description) category.description = description
    if (accountId) category.accountId = accountId
    if (budgetTarget !== undefined) category.budgetTarget = Number(budgetTarget)

    return category
}

function deleteCategories(id){
    const index = categories.findIndex((a) => a.id === id)

    if (index === -1) {
        const error = new Error("Category not found")
        error.statusCode = 400
        throw error
    }

    categories.splice(index, 1)
    return { message: "Category deleted successfully." }
}
module.exports = {getAllCategories,createCategories,updateCategories,deleteCategories}