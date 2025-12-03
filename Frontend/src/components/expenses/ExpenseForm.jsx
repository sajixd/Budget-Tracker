import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export function ExpenseForm() {
      const { addExpense } = useExpenses();
      const [form, setForm] = useState({ title: '', amount: '', category: '' });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const result = await addExpense(form);
            setIsSubmitting(false);

            if (result.success) {
                  setForm({ title: '', amount: '', category: '' });
            } else {
                  alert(result.error); // Simple error handling for now
            }
      };

      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Add Transaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                    <Input
                                          placeholder="e.g. Grocery Shopping"
                                          value={form.title}
                                          onChange={e => setForm({ ...form, title: e.target.value })}
                                          required
                                    />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                                          <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={form.amount}
                                                onChange={e => setForm({ ...form, amount: e.target.value })}
                                                required
                                                min="0"
                                                step="0.01"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                          <Input
                                                placeholder="e.g. Food"
                                                value={form.category}
                                                onChange={e => setForm({ ...form, category: e.target.value })}
                                                required
                                          />
                                    </div>
                              </div>

                              <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    {isSubmitting ? 'Adding...' : 'Add Transaction'}
                              </Button>
                        </form>
                  </CardContent>
            </Card>
      );
}
