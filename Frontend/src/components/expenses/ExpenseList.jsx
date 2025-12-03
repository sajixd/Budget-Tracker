import React, { useState } from 'react';
import { Trash2, Search, MoreVertical, Eye } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Modal } from '../ui/Modal';

export function ExpenseList() {
      const { expenses, loading, deleteExpense } = useExpenses();
      const [search, setSearch] = useState('');
      const [selectedExpense, setSelectedExpense] = useState(null);
      const [deleteId, setDeleteId] = useState(null);

      const filteredExpenses = expenses.filter(ex =>
            ex.title.toLowerCase().includes(search.toLowerCase()) ||
            ex.category.toLowerCase().includes(search.toLowerCase())
      );

      const handleDelete = async () => {
            if (deleteId) {
                  await deleteExpense(deleteId);
                  setDeleteId(null);
            }
      };

      if (loading) return <div className="text-center py-8">Loading expenses...</div>;

      return (
            <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle>Recent Transactions</CardTitle>
                        <div className="relative w-full max-w-xs">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input
                                    placeholder="Search transactions..."
                                    className="pl-9"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                              />
                        </div>
                  </CardHeader>
                  <CardContent>
                        <div className="space-y-4">
                              {filteredExpenses.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No transactions found.</p>
                              ) : (
                                    filteredExpenses.map(expense => (
                                          <div
                                                key={expense._id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                          >
                                                <div className="flex flex-col gap-1">
                                                      <span className="font-medium text-gray-900 dark:text-white">{expense.title}</span>
                                                      <span className="text-xs text-gray-500 dark:text-gray-400">{expense.category} • {new Date(expense.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                      <span className="font-semibold text-gray-900 dark:text-white">₹{expense.amount}</span>
                                                      <div className="flex gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => setSelectedExpense(expense)} className="h-8 w-8">
                                                                  <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(expense._id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                                  <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              )}
                        </div>
                  </CardContent>

                  {/* Details Modal */}
                  <Modal
                        isOpen={!!selectedExpense}
                        onClose={() => setSelectedExpense(null)}
                        title="Transaction Details"
                  >
                        {selectedExpense && (
                              <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                          <div>
                                                <label className="text-sm text-gray-500">Title</label>
                                                <p className="font-medium">{selectedExpense.title}</p>
                                          </div>
                                          <div>
                                                <label className="text-sm text-gray-500">Amount</label>
                                                <p className="font-medium">₹{selectedExpense.amount}</p>
                                          </div>
                                          <div>
                                                <label className="text-sm text-gray-500">Category</label>
                                                <p className="font-medium">{selectedExpense.category}</p>
                                          </div>
                                          <div>
                                                <label className="text-sm text-gray-500">Date</label>
                                                <p className="font-medium">{new Date(selectedExpense.date).toLocaleString()}</p>
                                          </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                          <Button onClick={() => setSelectedExpense(null)}>Close</Button>
                                    </div>
                              </div>
                        )}
                  </Modal>

                  {/* Delete Confirmation Modal */}
                  <Modal
                        isOpen={!!deleteId}
                        onClose={() => setDeleteId(null)}
                        title="Confirm Deletion"
                  >
                        <div className="space-y-4">
                              <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
                              <div className="flex justify-end gap-3">
                                    <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
                                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                              </div>
                        </div>
                  </Modal>
            </Card>
      );
}
