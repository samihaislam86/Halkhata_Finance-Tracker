import './App.css'
import Layout from './container/DashboardLayout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/app/Dashboard"
import Accounts from "./components/app/Accounts/AccountsPage"
import { Provider } from "react-redux"
import ExpensePage from './components/app/Expense/ExpensePage';
import Category from './components/app/Category/CategoryPage';
import CategoryDetail from './container/Category/CategoryDetails';
import FixedPage from './components/app/Fixed/FixedPage';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>     
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/category" element={<Category/>}/>
              <Route path="/category/:categoryId" element={<CategoryDetail />} />
              <Route path="/category/:categoryId/fixed" element={<FixedPage />} />
              <Route path="/expense" element={<ExpensePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
  )
}
export default App