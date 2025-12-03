import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { ExpenseForm } from './components/expenses/ExpenseForm';
import { ExpenseList } from './components/expenses/ExpenseList';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { BudgetCard } from './components/budget/BudgetCard';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        <SummaryCards />
        <BudgetCard />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 space-y-8">
            <ExpenseChart />
            <ExpenseList />
          </div>

          <div className="col-span-3">
            <ExpenseForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ExpenseProvider>
            <BudgetProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BudgetProvider>
          </ExpenseProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;