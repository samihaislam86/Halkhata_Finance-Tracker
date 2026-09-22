const express = require("express");
const router = express.Router()
const categoryController = require("../controllers/categoryController")

router.get("/", categoryController.getAllCategories)
router.post("/", categoryController.createCategories)
router.put("/:id", categoryController.updateCategories)
router.delete("/:id", categoryController.deleteCategories)


module.exports = router