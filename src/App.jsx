import './App.css'
import Layout from './container/DashboardLayout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/app/Dashboard"
import Accounts from "./components/app/Accounts/AccountsPage"

import { FinanceProvider } from "./context/FinanaceProvider"
import HomePage from './components/app/HomePage';
import ExpensePage from './components/app/Expense/ExpensePage';
import Category from './components/app/Category/CategoryPage';
import CategoryDetail from './container/Category/CategoryDetails';
import FixedPage from './components/app/Fixed/FixedPage';

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/category" element={<Category/>}/>
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/category/:categoryId/fixed" element={<FixedPage />} />
           
            <Route path="/expense" element={<ExpensePage/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  )
}
export default App