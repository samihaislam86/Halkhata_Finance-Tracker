const accountService = require("../services/accountServices")

function getAllAccounts(req, res) {
    const accounts = accountService.getAllAccounts()
    res.json(accounts)
}

function createAccount(req, res) {
    try{
        const newAccount = accountService.createAccount(req.body)
        res.status(201).json(newAccount)

    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message })

    }
}

function updateAccount(req, res) {
    try{
        const updatedAccount = accountService.updateAccount(req.params.id,req.body)
        res.status(200).json(updatedAccount)

    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message })

    }
}

function deleteAccount(req, res) {
    try{
        const deletedAccount = accountService.deleteAccount(req.params.id)
        res.status(200).json(deletedAccount)

    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message })

    }
}
    

module.exports = { getAllAccounts, createAccount, updateAccount, deleteAccount }