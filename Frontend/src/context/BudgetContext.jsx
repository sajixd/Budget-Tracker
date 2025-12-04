import { createContext, useContext, useEffect, useState } from "react";
import { useExpenses } from "./ExpenseContext";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function BudgetProvider({ children }) {
      const { expenses } = useExpenses();
      const { token } = useAuth();
      const [budgets, setBudgets] = useState([]);
      const [selectedType, setSelectedType] = useState('monthly'); // daily, monthly, yearly, custom
      const [customDate, setCustomDate] = useState(new Date());
      const [loading, setLoading] = useState(true);

      const fetchBudgets = async () => {
            if (!token) return;
            try {
                  setLoading(true);
                  const res = await fetch(`${API_URL}/api/budgets`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (res.ok) {
                        const data = await res.json();
                        setBudgets(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch budgets", error);
            } finally {
                  setLoading(false);
            }
      };

      const setBudget = async (amount, type = selectedType, date = customDate) => {
            try {
                  const res = await fetch(`${API_URL}/api/budgets`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ type, amount, customDate: type === 'custom' ? date : undefined }),
                  });
                  if (res.ok) {
                        await fetchBudgets();
                        return { success: true };
                  }
                  const data = await res.json();
                  return { success: false, error: data.message || 'Failed to save budget' };
            } catch (error) {
                  return { success: false, error: error.message };
            }
      };

      // Calculate spending based on selected type
      const getSpending = () => {
            const now = new Date();
            let filtered = [];

            switch (selectedType) {
                  case 'daily':
                        filtered = expenses.filter(ex => {
                              const d = new Date(ex.date);
                              return d.toDateString() === now.toDateString();
                        });
                        break;
                  case 'monthly':
                        filtered = expenses.filter(ex => {
                              const d = new Date(ex.date);
                              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                        });
                        break;
                  case 'yearly':
                        filtered = expenses.filter(ex => {
                              const d = new Date(ex.date);
                              return d.getFullYear() === now.getFullYear();
                        });
                        break;
                  case 'custom':
                        filtered = expenses.filter(ex => {
                              const d = new Date(ex.date);
                              const target = new Date(customDate);
                              return d.toDateString() === target.toDateString();
                        });
                        break;
                  default:
                        filtered = [];
            }

            return filtered.reduce((sum, ex) => sum + Number(ex.amount), 0);
      };

      const getCurrentBudget = () => {
            if (selectedType === 'custom') {
                  // Find custom budget for specific date if we were storing multiple custom dates, 
                  // but for now the backend stores one 'custom' entry or we'd need a more complex schema.
                  // Based on current schema, we just look for type 'custom'. 
                  // Ideally we'd match date, but for simplicity let's assume the 'custom' budget entry 
                  // is transient or we update it every time we change date.
                  // Actually, let's refine: The backend stores 'customDate'.
                  // So we should find the budget that matches the selected customDate.
                  return budgets.find(b =>
                        b.type === 'custom' &&
                        new Date(b.customDate).toDateString() === new Date(customDate).toDateString()
                  );
            }
            return budgets.find(b => b.type === selectedType);
      };

      useEffect(() => {
            if (token) fetchBudgets();
      }, [token]);

      return (
            <BudgetContext.Provider value={{
                  budgets,
                  loading,
                  selectedType,
                  setSelectedType,
                  customDate,
                  setCustomDate,
                  setBudget,
                  getSpending,
                  getCurrentBudget
            }}>
                  {children}
            </BudgetContext.Provider>
      );
}

export function useBudget() {
      return useContext(BudgetContext);
}
