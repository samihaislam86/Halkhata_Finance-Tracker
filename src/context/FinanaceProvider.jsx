import { FinanceContext } from "./FinanceContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const FinanceProvider = ({ children }) => {
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [categories, setCategories] = useLocalStorage("categories", []);
  const [fixedItems, setFixedItems] = useLocalStorage("fixedItems", []);

  const value = {
    accounts,
    transactions,
    categories,
    fixedItems,
    addAccount,
    addTransaction,
    updateAccount,
    deleteAccount,
    addCategory,
    updateCategory,
    deleteCategory,
    addFixedItem,
    updateFixedItem,
    deleteFixedItem,
    transferMoney
  };

  function addTransaction({ name, accountId, amount, type, categoryId }) {
    const transAmount = Number(amount);

    if (!accountId) {
        return { success: false, message: "Please choose an account." };
    }
    if (!transAmount || transAmount <= 0) {
        return { success: false, message: "Enter a valid amount." };
    }

    if (type === "withdraw") {
        const account = accounts.find((a) => a.id === accountId)
        if (!account) {
            return { success: false, message: "Invalid account." }
        }
        if (account.balance < transAmount) {
            return { success: false, message: "Insufficient balance in this account." }
        }
    }

    setAccounts((prev) =>
        prev.map((a) =>
            a.id === accountId
                ? {
                    ...a,
                    balance:
                        type === "withdraw"
                            ? a.balance - transAmount
                            : a.balance + transAmount,
                }
                : a
        )
    );

    if (type === "withdraw" && categoryId) {
        setCategories((prev) =>
            prev.map((c) =>
                c.id === categoryId ? { ...c, spent: (c.spent || 0) + transAmount } : c
            )
        )
    }

    setTransactions((prev) => [
        ...prev,
        {
            id: Date.now().toString(),
            name: name || "Untitled",
            accountId,
            type,
            categoryId: categoryId || null,
            amount: transAmount,
            date: new Date().toISOString(),
        },
    ]);

    return { success: true };
  }

  function transferMoney({ fromAccountId, toAccountId, amount }) {
    const transferAmount = Number(amount);

    if (!fromAccountId || !toAccountId) {
        return { success: false, message: "Please choose both accounts." };
    }
    if (fromAccountId === toAccountId) {
        return { success: false, message: "Cannot transfer to the same account." };
    }
    if (!transferAmount || transferAmount <= 0) {
        return { success: false, message: "Enter a valid amount." };
    }

    const fromAccount = accounts.find((a) => a.id === fromAccountId)
    if (!fromAccount) {
        return { success: false, message: "Invalid source account." }
    }
    if (fromAccount.balance < transferAmount) {
        return { success: false, message: "Insufficient balance in source account." }
    }
//transfer money 
    setAccounts((prev) =>
        prev.map((a) => {
            if (a.id === fromAccountId) {
                return { ...a, balance: a.balance - transferAmount }
            }
            if (a.id === toAccountId) {
                return { ...a, balance: a.balance + transferAmount }
            }
            return a
        })
    );

    setTransactions((prev) => [
        ...prev,
        {
            id: Date.now().toString(),
            name: `Transfer to ${accounts.find(a => a.id === toAccountId)?.name || "account"}`,
            accountId: fromAccountId,
            type: "transfer",
            categoryId: null,
            amount: transferAmount,
            date: new Date().toISOString(),
        },
    ]);

    return { success: true };
  }

  function addAccount({ name, type, balance }) {
    const nameExists = accounts.some(
        (a) => a.name.trim().toLowerCase() === name.trim().toLowerCase()
    )
    if (nameExists) {
        return { success: false, message: "An account with this name already exists." }
    }

    const newAccount = {
        id: Date.now().toString(),
        name,
        type,
        balance: Number(balance) || 0,
    };
    setAccounts((prev) => [...prev, newAccount]);
    return { success: true, id: newAccount.id };
}

function updateAccount(id, updatedFields) {
    if (updatedFields.name) {
        const nameExists = accounts.some(
            (a) => a.id !== id && a.name.trim().toLowerCase() === updatedFields.name.trim().toLowerCase()
        )
        if (nameExists) {
            return { success: false, message: "An account with this name already exists." }
        }
    }

    setAccounts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    return { success: true }
}


  function deleteAccount(id) {
    setAccounts((prev) => prev.filter((item) => item.id !== id));
  }

  function addCategory({ name, description, accountId, budgetTarget }) {
    const newCategory = {
        id: Date.now().toString(),
        name,
        description: description || "",
        accountId: accountId || null,
        budgetTarget: Number(budgetTarget) || 0,
        spent: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory.id;
  }

  function updateCategory(id, updatedFields) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function addFixedItem({ name, description, categoryId, target }) {
    const newFixedItem = {
      id: Date.now().toString(),
      name,
      description: description || "",
      categoryId,
      target: Number(target) || 0,
    };
    setFixedItems((prev) => [...prev, newFixedItem]);
    return newFixedItem.id;
  }

  function updateFixedItem(id, updatedFields) {
    setFixedItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
  }

  function deleteFixedItem(id) {
    setFixedItems((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};