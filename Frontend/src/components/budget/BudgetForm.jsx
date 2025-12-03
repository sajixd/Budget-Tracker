import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

export function BudgetForm() {
      const { selectedType, getCurrentBudget, setBudget, customDate } = useBudget();
      const [isOpen, setIsOpen] = useState(false);
      const [amount, setAmount] = useState('');

      const currentBudget = getCurrentBudget();

      const handleOpen = () => {
            setAmount(currentBudget ? currentBudget.amount.toString() : '');
            setIsOpen(true);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const result = await setBudget(Number(amount));
            if (result.success) {
                  setIsOpen(false);
            } else {
                  alert(result.error || "Failed to save budget. Please try again.");
            }
      };

      return (
            <>
                  <Button variant="outline" size="sm" onClick={handleOpen}>
                        <Settings className="mr-2 h-4 w-4" />
                        Set Budget
                  </Button>

                  <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title={`Set ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Budget`}
                  >
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Budget Amount (₹)
                                    </label>
                                    <Input
                                          type="number"
                                          value={amount}
                                          onChange={(e) => setAmount(e.target.value)}
                                          placeholder="Enter amount"
                                          required
                                          min="0"
                                    />
                              </div>
                              {selectedType === 'custom' && (
                                    <p className="text-sm text-gray-500">
                                          For date: {customDate.toLocaleDateString()}
                                    </p>
                              )}
                              <div className="flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                          Cancel
                                    </Button>
                                    <Button type="submit">Save Budget</Button>
                              </div>
                        </form>
                  </Modal>
            </>
      );
}
