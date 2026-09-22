const { accounts } = require("../data/store")

function getAllAccounts(req, res) {
    res.json(accounts)
}

function createAccount(req, res) {
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
}

function updateAccount(req, res) {
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
}

function deleteAccount(req, res) {
    const { id } = req.params
    const index = accounts.findIndex((a) => a.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Account not found." })
    }

    accounts.splice(index, 1)
    res.status(200).json({ message: "Account deleted successfully." })
}

module.exports = { getAllAccounts, createAccount, updateAccount, deleteAccount }