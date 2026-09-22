const { fixedItems,transactions,categories,accounts } = require("../data/store")

function getAllFixedItem(req,res){
    res.json(fixedItems)

}

function createFixedItem(req,res){
    const { name, description, categoryId, target}= req.body

    const newFixedItems = {
        id: Date.now().toString(),
        name: name || "Untitled",
        description:description || "",
        categoryId: categoryId || null,
        target: Number(target) || 0,
        
    }
    fixedItems.push(newFixedItems)
    res.status(201).json(newFixedItems)

}

function updateFixedItem(req,res){
    const { id } = req.params
    const { name, description, categoryId, target}= req.body

    const fixedItem = fixedItems.find((c) => c.id === id)
    if (!fixedItem) {
        return res.status(404).json({ message: "fixedItem not found." })
    }

    if (name) fixedItem.name = name
    if (description) fixedItem.description = description
    if (categoryId) fixedItem.categoryId = categoryId
    if (target !== undefined) fixedItem.target = Number(target)

    res.status(200).json(fixedItem)   

}

function deleteFixedItem(req,res){
    const { id } = req.params
    const index = fixedItems.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "fixedItems not found." })
    }

    fixedItems.splice(index, 1)
    res.status(200).json({ message: "fixedItems deleted successfully." })

}


function getCurrentMonthKey() {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}`
}

function createFixedItemPay(req, res){
    const { id } = req.params
    const currentMonth = getCurrentMonthKey()

    const fixedItem = fixedItems.find((f) => f.id === id)
    if (!fixedItem) {
        return res.status(404).json({ message: "Fixed item not found." })
    }

    if (fixedItem.lastPaidMonth === currentMonth) {
        return res.status(400).json({ message: "This has already been paid this month." })
    }

    const category = categories.find((c) => c.id === fixedItem.categoryId)
    if (!category || !category.accountId) {
        return res.status(400).json({ message: "This category has no linked account." })
    }

    const account = accounts.find((a) => a.id === category.accountId)
    if (!account) {
        return res.status(404).json({ message: "Invalid account." })
    }
    if (account.balance < fixedItem.target) {
        return res.status(400).json({ message: "Insufficient balance in this account." })
    }
        account.balance = account.balance - fixedItem.target
        category.spent = (category.spent || 0) + fixedItem.target

        const newTransaction = {
        id: Date.now().toString(),
        name: fixedItem.name,
        accountId: account.id,
        type: "withdraw",
        categoryId: fixedItem.categoryId,
        amount: fixedItem.target,
        date: new Date().toISOString(),
    }
    transactions.push(newTransaction)
    fixedItem.lastPaidMonth = currentMonth
    res.status(200).json(fixedItem)


}

module.exports = { getAllFixedItem, createFixedItem, updateFixedItem, deleteFixedItem ,createFixedItemPay}