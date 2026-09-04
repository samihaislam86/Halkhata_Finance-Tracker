
import './App.css'
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './pages/DashboardLayout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/DashboardLayout/Dashboard"
import Accounts from "./pages/Accounts/Accounts"
import Cash from './pages/Accounts/CashDetails';
import Bank from "./pages/Accounts/BankDetails";
import { FinanceProvider } from "./context/FinanceContext"

import ExpenseGroupDetails from './pages/Expenses/ExpenseGroupDetails';
import ExpensesDetail from './pages/Expenses/ExpensesDetail';

function App() {
  return(
    <FinanceProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/cash" element={<Cash />} />
          <Route path="/accounts/bank" element={<Bank />} />
          <Route path="/expense" element={<ExpensesDetail />} />
          <Route path="/expense/:groupId" element={<ExpenseGroupDetails />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </FinanceProvider>  
  )       
}
export default App
