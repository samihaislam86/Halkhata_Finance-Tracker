const { transactions, accounts, categories } = require("../data/store")

function getAllTransaction(req, res){
    res.json(transactions)
}

function createTransaction(req, res){
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
}

module.exports = { getAllTransaction, createTransaction, }