
const express = require("express")
const router = express.Router()
const fixedItemController = require("../controllers/fixedItemController")

router.get("/", fixedItemController.getAllFixedItem)
router.post("/", fixedItemController.createFixedItem)
router.put("/:id", fixedItemController.updateFixedItem)
router.delete("/:id", fixedItemController.deleteFixedItem)
router.post("/:id", fixedItemController.createFixedItemPay)


module.exports = router