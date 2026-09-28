const { accounts } = require("../data/store")

function getAllAccounts() {
    return accounts
}

function createAccount({ name, type, balance }) {

    const nameExists = accounts.some(
        (a) => a.name.toLowerCase() === name.toLowerCase()
    )
    if (nameExists) {
        const error = new Error("An account with this name already exists.")
        error.statusCode = 400
        throw error
    }

    const newAccount = {
        id: Date.now().toString(),
        name,
        type,
        balance: Number(balance) || 0,
    }

    accounts.push(newAccount)
    return newAccount
    
}

function updateAccount(id,{ name, type, balance } ) {

    const account = accounts.find((a) => a.id === id)
    if (!account) {
        const error = new Error("Account not Found")
        error.statusCode = 404
        throw error 
    }

    if (name) account.name = name
    if (type) account.type = type
    if (balance !== undefined) account.balance = Number(balance)

    return account
}

function deleteAccount(id) {
    const index = accounts.findIndex((a) => a.id === id)

    if (index === -1) {
        const error = new Error("Account not Found")
        error.statusCode = 404
        throw error 
    }

    accounts.splice(index, 1)
    return { message: "Account deleted successfully." }
}

module.exports = { getAllAccounts, createAccount, updateAccount, deleteAccount }