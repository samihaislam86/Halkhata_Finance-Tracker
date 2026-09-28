const express = require("express")
const router = express.Router()
const transactionController = require("../controllers/transactionController")

router.get("/", transactionController.getAllTransaction)
router.post("/", transactionController.createTransaction)
router.post("/transfer", transactionController.transferMoney)

module.exports = router