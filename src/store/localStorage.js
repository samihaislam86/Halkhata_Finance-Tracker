function saveAllState(store) {
    const state = store.getState()
    localStorage.setItem("accounts", JSON.stringify(state.accounts))
    localStorage.setItem("categories", JSON.stringify(state.categories))
    localStorage.setItem("transactions", JSON.stringify(state.transactions))
    localStorage.setItem("fixedItems", JSON.stringify(state.fixedItems))
}

function handleAction(store, next, action) {
    const result = next(action)
    saveAllState(store)
    return result
}

export function localStorageMiddleware(store) {
    function withNext(next) {
        function withAction(action) {
            return handleAction(store, next, action)
        }
        return withAction
    }
    return withNext
}