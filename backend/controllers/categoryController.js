const categoryService = require("../services/categoryServices")


function getAllCategories(req, res){
    const categories = categoryService.getAllCategories()
    res.json(categories)
}

function createCategories(req,res){
    try{
            const newCategory = categoryService.createCategories(req.body)
            res.status(201).json(newCategory)
    
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message })
    
        }
    }

function updateCategories(req, res) {
    try{
            const updatedCategory = categoryService.updateCategories(req.params.id,req.body)
            res.status(200).json(updatedCategory)
    
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message })
    
        }
    }

function deleteCategories(req, res){
    try{
            const deletedCategory = categoryService.deleteCategories(req.params.id)
            res.status(200).json(deletedCategory)
    
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message })
    
        }
    }
module.exports = {getAllCategories,createCategories,updateCategories,deleteCategories}