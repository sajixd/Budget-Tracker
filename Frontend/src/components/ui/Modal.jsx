import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export function Modal({ isOpen, onClose, title, children, className }) {
      useEffect(() => {
            if (isOpen) {
                  document.body.style.overflow = 'hidden';
            } else {
                  document.body.style.overflow = 'unset';
            }
            return () => {
                  document.body.style.overflow = 'unset';
            };
      }, [isOpen]);

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                  <div
                        className={cn(
                              "relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card dark:text-white animate-in zoom-in-95 duration-200",
                              className
                        )}
                  >
                        <div className="flex items-center justify-between mb-4">
                              <h2 className="text-xl font-semibold">{title}</h2>
                              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                                    <X className="h-4 w-4" />
                              </Button>
                        </div>
                        {children}
                  </div>
            </div>
      );
}
