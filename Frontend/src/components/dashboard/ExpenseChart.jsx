import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

export function ExpenseChart() {
      const { expenses } = useExpenses();
      const { theme } = useTheme();

      // Group by category
      const data = Object.entries(expenses.reduce((acc, ex) => {
            acc[ex.category] = (acc[ex.category] || 0) + Number(ex.amount);
            return acc;
      }, {})).map(([name, value]) => ({ name, value }));

      const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6', '#ec4899'];

      return (
            <Card className="col-span-4">
                  <CardHeader>
                        <CardTitle>Spending by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                              {data.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} vertical={false} />
                                                <XAxis
                                                      dataKey="name"
                                                      stroke="#888888"
                                                      fontSize={12}
                                                      tickLine={false}
                                                      axisLine={false}
                                                />
                                                <YAxis
                                                      stroke="#888888"
                                                      fontSize={12}
                                                      tickLine={false}
                                                      axisLine={false}
                                                      tickFormatter={(value) => `₹${value}`}
                                                />
                                                <Tooltip
                                                      cursor={{ fill: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
                                                      contentStyle={{
                                                            backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                                                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                                            color: theme === 'dark' ? '#fff' : '#000'
                                                      }}
                                                />
                                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                      {data.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                      ))}
                                                </Bar>
                                          </BarChart>
                                    </ResponsiveContainer>
                              ) : (
                                    <div className="flex h-full items-center justify-center text-gray-500">
                                          No data available
                                    </div>
                              )}
                        </div>
                  </CardContent>
            </Card>
      );
}
