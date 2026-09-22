const express = require("express")
const cors = require("cors")
const accountRoutes = require("./routes/accountRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const fixedItemRoutes = require("./routes/fixedItemRoutes")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use("/accounts", accountRoutes)
app.use("/categories", categoryRoutes)
app.use("/transactions", transactionRoutes)
app.use("/fixedItems", fixedItemRoutes)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})