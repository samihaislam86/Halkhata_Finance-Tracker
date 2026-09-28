const fixedItemService = require("../services/fixedItemServices")

function getAllFixedItem(req, res) {
    const fixedItems = fixedItemService.getAllFixedItem()
    res.json(fixedItems)

}

function createFixedItem(req, res) {
    try {
        const newFixedItem = fixedItemService.createFixedItem(req.body)
        res.status(201).json(newFixedItem)

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })

    }

}

function updateFixedItem(req, res) {
    try {
        const updatedFixedItem = fixedItemService.updateFixedItem(req.params.id, req.body)
        res.status(200).json(updatedFixedItem)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
}

function deleteFixedItem(req, res) {
    try {
        const result = fixedItemService.deleteFixedItem(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
}



function createFixedItemPay(req, res) {
    try {
        const paidFixedItem = fixedItemService.createFixedItemPay(req.params.id)
        res.status(200).json(paidFixedItem)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
}

module.exports = { getAllFixedItem, createFixedItem, updateFixedItem, deleteFixedItem, createFixedItemPay }