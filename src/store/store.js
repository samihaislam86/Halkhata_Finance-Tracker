import { configureStore } from "@reduxjs/toolkit"
import accountsReducer from "./AccountSlice"
import categoriesReducer from "./categoriesSlice"
import transactionsReducer from "./transactionSlice"
import fixedItemsReducer from "./fixedSlice"
import { localStorageMiddleware } from "./localStorage"


export const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
        fixedItems: fixedItemsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})