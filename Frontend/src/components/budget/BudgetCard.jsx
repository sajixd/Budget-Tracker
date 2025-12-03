import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { BudgetSelector } from './BudgetSelector';
import { BudgetProgressBar } from './BudgetProgressBar';
import { BudgetForm } from './BudgetForm';

export function BudgetCard() {
      const { selectedType, getSpending, getCurrentBudget } = useBudget();

      const spending = getSpending();
      const budget = getCurrentBudget();

      return (
            <Card className="col-span-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Budget Overview</CardTitle>
                        <BudgetForm />
                  </CardHeader>
                  <CardContent className="space-y-6">
                        <BudgetSelector />

                        {budget ? (
                              <BudgetProgressBar
                                    spent={spending}
                                    total={budget.amount}
                                    type={selectedType}
                              />
                        ) : (
                              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                                    <p className="text-gray-500">No budget set for this {selectedType} view.</p>
                              </div>
                        )}
                  </CardContent>
            </Card>
      );
}
