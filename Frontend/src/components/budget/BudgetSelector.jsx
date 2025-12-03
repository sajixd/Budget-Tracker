import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { cn } from '../../lib/utils';

export function BudgetSelector() {
      const { selectedType, setSelectedType, customDate, setCustomDate } = useBudget();

      const types = [
            { id: 'daily', label: 'Daily' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' },
            { id: 'custom', label: 'Custom' },
      ];

      return (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                        {types.map((type) => (
                              <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={cn(
                                          "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
                                          selectedType === type.id
                                                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                                                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    )}
                              >
                                    {type.label}
                              </button>
                        ))}
                  </div>

                  {selectedType === 'custom' && (
                        <input
                              type="date"
                              value={customDate.toISOString().split('T')[0]}
                              onChange={(e) => setCustomDate(new Date(e.target.value))}
                              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                  )}
            </div>
      );
}
