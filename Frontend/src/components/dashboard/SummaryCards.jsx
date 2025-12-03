import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export function SummaryCards() {
      const { expenses } = useExpenses();

      const totalExpenses = expenses.reduce((sum, ex) => sum + Number(ex.amount), 0);
      // Assuming all entries are expenses for now as per original app logic. 
      // If there were income entries, we'd filter them.

      // Let's calculate category breakdown for the "Top Category" card
      const categoryTotals = expenses.reduce((acc, ex) => {
            acc[ex.category] = (acc[ex.category] || 0) + Number(ex.amount);
            return acc;
      }, {});

      const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

      return (
            <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                              <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Total spendings so far
                              </p>
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Transaction Count</CardTitle>
                              <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold">{expenses.length}</div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Total number of transactions
                              </p>
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                              <TrendingDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold">{topCategory ? topCategory[0] : '-'}</div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {topCategory ? `₹${topCategory[1].toFixed(2)} spent` : 'No data yet'}
                              </p>
                        </CardContent>
                  </Card>
            </div>
      );
}
