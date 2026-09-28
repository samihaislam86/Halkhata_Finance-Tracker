const { transactions, accounts, categories } = require("../data/store")

function getAllTransaction() {
    return transactions
}

function createTransaction({ name, accountId, amount, type, categoryId }) {

    const transAmount = Number(amount)


    if (!accountId) {
        const error = new Error("Please choose an account.")
        error.statusCode = 400
        throw error
    }
    if (!transAmount || transAmount <= 0) {
        const error = new Error("Enter a valid amount.")
        error.statusCode = 400
        throw error
    }

    const account = accounts.find((a) => a.id === accountId)
    if (type === "withdraw") {
        if (!account) {
            const error = new Error("Invalid account.")
            error.statusCode = 404
            throw error
        }
        if (account.balance < transAmount) {
            const error = new Error("Insufficient balance in this account.")
            error.statusCode = 400
            throw error
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
    return newTransaction

}
function transferMoney({ fromAccountId, toAccountId, amount }){
    const transAmount = Number(amount)

    if(!fromAccountId || !toAccountId){
        const error = new Error("Please choose both accounts")
        error.statusCode = 400
        throw error
    }
    if(fromAccountId === toAccountId){
        const error = new Error("Cant transfer to same account")
        error.statusCode = 400
        throw error
    }
    if(!transAmount|| transAmount<=0){
        const error = new Error("Please enter valid amount")
        error.statusCode = 400
        throw error
    }
    const fromAccount = accounts.find((a)=>a.id === fromAccountId)
    const toAccount = accounts.find((a)=>a.id === toAccountId)

    if(!fromAccount || !toAccount){
        const error = new Error("Invalid Account")
        error.statusCode = 400
        throw error
    }
    if(fromAccount.balance < transAmount){
        const error = new Error("Insufficient Balance")
        error.statusCode = 400
        throw error
    }

    fromAccount.balance -=transAmount
    toAccount.balance +=transAmount

    return {fromAccount,toAccount}

}

module.exports = { getAllTransaction, createTransaction, transferMoney}