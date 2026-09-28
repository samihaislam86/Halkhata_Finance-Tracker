const { fixedItems,transactions,categories,accounts } = require("../data/store")

function getAllFixedItem(){
    return fixedItems

}

function createFixedItem({ name, description, categoryId, target}){

    const newFixedItems = {
        id: Date.now().toString(),
        name: name || "Untitled",
        description:description || "",
        categoryId: categoryId || null,
        target: Number(target) || 0,
        
    }
    fixedItems.push(newFixedItems)
    return newFixedItems

}

function updateFixedItem(id,{ name, description, categoryId, target} ){

    const fixedItem = fixedItems.find((c) => c.id === id)
    if (!fixedItem) {
        const error = new Error("FixedItem not Found")
        error.statusCode = 404
        throw error
    }

    if (name) fixedItem.name = name
    if (description) fixedItem.description = description
    if (categoryId) fixedItem.categoryId = categoryId
    if (target !== undefined) fixedItem.target = Number(target)

    return  fixedItem

}

function deleteFixedItem(id){
    
    const index = fixedItems.findIndex((a) => a.id === id)

    if (index === -1) {
        const error = new Error("FixedItem not Found")
        error.statusCode = 404
        throw error
    }

    fixedItems.splice(index, 1)
    return { message: "fixedItems deleted successfully." }

}


function getCurrentMonthKey() {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}`
}

function createFixedItemPay(id){
    
    const currentMonth = getCurrentMonthKey()

    const fixedItem = fixedItems.find((f) => f.id === id)
    if (!fixedItem) {
        const error = new Error("FixedItem not Found")
        error.statusCode = 404
        throw error
    }

    if (fixedItem.lastPaidMonth === currentMonth) {
        const error = new Error("This has already been paid this month." )
        error.statusCode = 409
        throw error
    }

    const category = categories.find((c) => c.id === fixedItem.categoryId)
    if (!category || !category.accountId) {
        const error = new Error("This category has no linked account." )
        error.statusCode = 400
        throw error
       
    }

    const account = accounts.find((a) => a.id === category.accountId)
    if (!account) {
        const error = new Error("Invalid account")
        error.statusCode = 404
        throw error
    }
    if (account.balance < fixedItem.target) {
        const error = new Error("Insufficient Balance on this account")
        error.statusCode = 400
        throw error
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
    return fixedItem


}

module.exports = { getAllFixedItem, createFixedItem, updateFixedItem, deleteFixedItem ,createFixedItemPay}