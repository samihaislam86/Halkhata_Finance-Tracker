
import './App.css'
import Layout from './container/DashboardLayout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./container/DashboardLayout/Dashboard"
import Accounts from "./container/Accounts/Accounts"
import Cash from './container/Accounts/CashDetails';
import Bank from "./container/Accounts/BankDetails";
import { FinanceProvider } from "./context/FinanaceProvider"

import ExpenseGroupDetails from './container/Expenses/ExpenseGroupDetails';
import ExpensesDetail from './container/Expenses/ExpensesDetail';

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
