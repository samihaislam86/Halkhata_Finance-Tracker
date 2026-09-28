const transactionService = require("../services/transactionServices")

function getAllTransaction(req, res) {
    const transactions = transactionService.getAllTransaction()
    res.json(transactions)
}

function createTransaction(req, res) {
    try {
        const newTransaction = transactionService.createTransaction(req.body)
        res.status(201).json(newTransaction)

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })

    }
}

function transferMoney(req, res) {
    try {
        const transfer = transactionService.transferMoney(req.body)
        res.status(200).json(transfer)

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })

    }
}

module.exports = { getAllTransaction, createTransaction ,transferMoney }