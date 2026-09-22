const { categories } = require("../data/store")


function getAllCategories(req, res){
    res.json(categories)
}

function createCategories(req,res){
    const {name, description, accountId,budgetTarget}=req.body

    const nameExists = categories.some(
        (a) => a.name.toLowerCase() === name.toLowerCase()
    )
    if (nameExists) {
        return res.status(400).json({ message: "A category with this name already exists." })
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
    res.status(201).json(newCategory)

}

function updateCategories(req, res) {
    const { id } = req.params
    const { name, description, accountId, budgetTarget } = req.body

    const category = categories.find((c) => c.id === id)
    if (!category) {
        return res.status(404).json({ message: "Category not found." })
    }

    if (name) category.name = name
    if (description) category.description = description
    if (accountId) category.accountId = accountId
    if (budgetTarget !== undefined) category.budgetTarget = Number(budgetTarget)

    res.status(200).json(category)
}

function deleteCategories(req, res){
    const { id } = req.params
    const index = categories.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Category not found." })
    }

    categories.splice(index, 1)
    res.status(200).json({ message: "Category deleted successfully." })
}
module.exports = {getAllCategories,createCategories,updateCategories,deleteCategories}