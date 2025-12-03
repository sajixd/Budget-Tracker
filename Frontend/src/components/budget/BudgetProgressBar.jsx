import React from 'react';
import { cn } from '../../lib/utils';

export function BudgetProgressBar({ spent, total, type }) {
      const percentage = Math.min((spent / total) * 100, 100);

      const colors = {
            daily: 'bg-blue-500',
            monthly: 'bg-green-500',
            yearly: 'bg-purple-500',
            custom: 'bg-orange-500',
      };

      const isOverBudget = spent > total;

      return (
            <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                              ₹{spent.toFixed(2)} <span className="text-gray-500">spent</span>
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                              ₹{total.toFixed(2)} <span className="text-gray-500">limit</span>
                        </span>
                  </div>

                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                              className={cn(
                                    "h-full transition-all duration-500 ease-out",
                                    isOverBudget ? "bg-red-500" : colors[type] || 'bg-primary-500'
                              )}
                              style={{ width: `${percentage}%` }}
                        />
                  </div>

                  <div className="text-right text-xs text-gray-500">
                        {percentage.toFixed(1)}% used
                  </div>
            </div>
      );
}
