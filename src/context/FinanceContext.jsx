import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [expenseGroups, setExpenseGroups] = useLocalStorage("expenseGroups", [])
  const [expenseCategories, setExpenseCategories] = useLocalStorage("expenseCategories", [])

  const value = {
    accounts,
    transactions,
    expenseGroups,
    expenseCategories,
    addAccount,
    addTransaction,
    addExpenseGroup,
    addExpenseCategory,
    addRecurringCategory
  };

  function addAccount({ name, type, balance }) {
    const newAccount = {
      id: Date.now().toString(),
      name,
      type,
      balance: Number(balance) || 0,
    };
    setAccounts((prev) => [...prev, newAccount]);
    return newAccount.id;
  }

  function addTransaction({ accountId, amount, type, note, categoryId }) {
    const numericAmount = Number(amount);

    if (!accountId) {
      return { success: false, message: "Please choose an account." };
    }
    if (!numericAmount || numericAmount <= 0) {
      return { success: false, message: "Enter a valid amount." };
    }

    if (type === "withdraw") {
      const account = accounts.find((a) => a.id === accountId)
      if (!account) {
        return { success: false, message: "Invalid account." }
      }
      if (account.balance < numericAmount) {
        return { success: false, message: "Insufficient balance in this account." }
      }
    }

    if (type === "withdraw" && categoryId) {
      const category = expenseCategories.find((c) => c.id === categoryId)
      if (!category) {
        return { success: false, message: "Invalid category." }
      }
      if (category.spent + numericAmount > category.budget) {
        return { success: false, message: "This would go over budget for that category." }
      }
    }

    setAccounts((prev) =>
      prev.map((a) =>
        a.id === accountId
          ? {
            ...a,
            balance:
              type === "withdraw"
                ? a.balance - numericAmount
                : a.balance + numericAmount,
          }
          : a
      )
    );

    if (type === "withdraw" && categoryId) {
      setExpenseCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, spent: c.spent + numericAmount } : c
        )
      )
    }

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        accountId,
        type,
        categoryId: categoryId || null,
        amount: numericAmount,
        note: note || "",
        date: new Date().toISOString(),
      },
    ]);

    return { success: true };

  }
  function addExpenseGroup({ name }) {
    const newGroup = {
      id: Date.now().toString(),
      name,
    }
    setExpenseGroups((prev) => [...prev, newGroup])
    return newGroup.id
  }
  function addExpenseCategory({ groupId, name, budget, isRecurring, fixedAmount }) {
    const newCategory = {
      id: Date.now().toString(),
      groupId,
      name,
      budget: Number(budget) || 0,
      spent: 0,
      isRecurring: !!isRecurring,
      fixedAmount: isRecurring ? Number(fixedAmount) || 0 : null,
      lastMonthPaid: null

    }
    setExpenseCategories((prev) => [...prev, newCategory])
    return newCategory.id
  }

  function addRecurringCategory({ categoryId, accountId }) {
    const category = expenseCategories.find((c) => c.id === categoryId)
    if (!category) {
      return { success: false, message: "Invalid category." }
    }
    if (!category.isRecurring) {
      return { success: false, message: "" }
    }
    const currentMonth = new Date().toISOString
    if (category.lastMonthPaid === currentMonth) {
      return { success: false, message: "Already paid this month" }
    }

    const account = accounts.find((a) => a.id === accountId)
    if (!account) {
      return { success: false, message: "Invalid account." }
    }
    if (account.balance < category.fixedAmount) {
      return { success: false, message: "Insufficient balance in this account." }
    }
    
    const amount = category.fixedAmount

    setAccounts((prev) =>
      prev.map((a) =>
        a.id === accountId
          ? { ...a, balance: a.balance - amount } : a))

    setExpenseCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, spent: c.spent + amount, lastMonthPaid: currentMonth } : c))

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        accountId,
        type: "withdraw",
        categoryId,
        amount,
        note: `${category.name}(recurring)`,
        date: new Date().toISOString(),
      },
    ]);

    return { success: true }

  }


  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};