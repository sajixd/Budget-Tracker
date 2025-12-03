import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', ...props }, ref) => {
      const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
            danger: 'bg-red-500 text-white hover:bg-red-600',
            ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
            outline: 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
      };

      const sizes = {
            default: 'h-10 px-4 py-2',
            sm: 'h-8 px-3 text-sm',
            lg: 'h-12 px-8 text-lg',
            icon: 'h-10 w-10 p-2 flex items-center justify-center'
      };

      return (
            <button
                  ref={ref}
                  className={cn(
                        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
                        variants[variant],
                        sizes[size],
                        className
                  )}
                  {...props}
            />
      );
});

Button.displayName = "Button";

export { Button };
