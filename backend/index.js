const express = require("express")

const app = express()
const PORT = 3000

app.use(express.json())

let accounts = []

app.get("/accounts", (req, res) => {
    res.json(accounts)
})

app.post("/accounts", (req, res) => {
    const { name, type, balance } = req.body

    const nameExists = accounts.some(
        (a) => a.name.toLowerCase() === name.toLowerCase()
    )
    if (nameExists) {
        return res.status(400).json({ message: "An account with this name already exists." })
    }

    const newAccount = {
        id: Date.now().toString(),
        name,
        type,
        balance: Number(balance) || 0,
    }

    accounts.push(newAccount)
    res.status(201).json(newAccount)
})

app.put("/accounts/:id", (req, res) => {
    const { id } = req.params
    const { name, type, balance } = req.body

    const account = accounts.find((a) => a.id === id)
    if (!account) {
        return res.status(404).json({ message: "Account not found." })
    }

    if (name) account.name = name
    if (type) account.type = type
    if (balance !== undefined) account.balance = Number(balance)

    res.status(200).json(account)
})

app.delete("/accounts/:id", (req, res) => {
    const { id } = req.params
    const index = accounts.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Account not found." })
    }

    accounts.splice(index, 1)
    res.status(200).json({ message: "Account deleted successfully." })
})

let categories = []

app.get("/categories", (req, res) => {
    res.json(categories)
})

app.post("/categories",(req,res)=>{
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

})

app.put("/categories/:id", (req, res) => {
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
})

app.delete("/categories/:id", (req, res) => {
    const { id } = req.params
    const index = categories.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Category not found." })
    }

    categories.splice(index, 1)
    res.status(200).json({ message: "Category deleted successfully." })
})

let transactions = []

app.get("/transactions", (req, res) => {
    res.json(transactions)
})

app.post("/transactions", (req, res) => {
    const { name, accountId, amount, type, categoryId } = req.body
    const transAmount = Number(amount)


    if (!accountId) {
        return res.status(400).json({ message: "Please choose an account." })
    }
    if (!transAmount || transAmount <= 0) {
        return res.status(400).json({ message: "Enter a valid amount." })
    }
    
    const account = accounts.find((a) => a.id === accountId)
    if (type === "withdraw") {
        if (!account) {
            return res.status(404).json({ message: "Invalid account." })
        }
        if (account.balance < transAmount) {
            return res.status(400).json({ message: "Insufficient balance in this account." })
        }
    }

    if (account) {
        account.balance = type === "withdraw"
            ? account.balance - transAmount
            : account.balance + transAmount
    }


    if (type === "withdraw" && categoryId) {
        const category = categories.find((c) => c.id === categoryId)
        if (category) {
            category.spent = (category.spent || 0) + transAmount
        }
    }

    const newTransaction = {
        id: Date.now().toString(),
        name: name || "Untitled",
        accountId,
        type,
        categoryId: categoryId || null,
        amount: transAmount,
        date: new Date().toISOString(),
    }
    transactions.push(newTransaction)

    res.status(201).json(newTransaction)
})

let fixedItems = []

app.get("/fixedItems",(req,res)=>{
    res.json(fixedItems)

})

app.post("/fixedItems" , (req,res)=>{
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

})

app.put("/fixedItems/:id" , (req,res)=>{
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

})

app.delete("/fixedItems/:id",(req,res)=>{
    const { id } = req.params
    const index = fixedItems.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "fixedItems not found." })
    }

    fixedItems.splice(index, 1)
    res.status(200).json({ message: "fixedItems deleted successfully." })

})


function getCurrentMonthKey() {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}`
}

app.post("/fixedItems/:id/pay", (req, res) => {
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


})




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})