import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function ExpenseProvider({ children }) {
      const [expenses, setExpenses] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const { token } = useAuth();

      const fetchExpenses = async () => {
            if (!token) return;
            try {
                  setLoading(true);
                  const res = await fetch(`${API_URL}/api/expenses`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (!res.ok) throw new Error('Failed to fetch expenses');
                  const data = await res.json();
                  setExpenses(data);
                  setError(null);
            } catch (err) {
                  setError(err.message);
            } finally {
                  setLoading(false);
            }
      };

      const addExpense = async (expenseData) => {
            try {
                  const res = await fetch(`${API_URL}/api/expenses/add`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(expenseData),
                  });
                  if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData.message || 'Failed to add expense');
                  }
                  await fetchExpenses();
                  return { success: true };
            } catch (err) {
                  return { success: false, error: err.message };
            }
      };

      const deleteExpense = async (id) => {
            try {
                  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (!res.ok) throw new Error('Failed to delete expense');
                  await fetchExpenses();
                  return { success: true };
            } catch (err) {
                  return { success: false, error: err.message };
            }
      };

      useEffect(() => {
            if (token) fetchExpenses();
      }, [token]);

      return (
            <ExpenseContext.Provider value={{ expenses, loading, error, addExpense, deleteExpense, fetchExpenses }}>
                  {children}
            </ExpenseContext.Provider>
      );
}

export function useExpenses() {
      return useContext(ExpenseContext);
}
