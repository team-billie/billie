import React from 'react';
import { formatDate } from '@/lib/utils/date/formatDate';

interface DateDividerProps {
  date: Date;
  className?: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date, className = '' }) => {
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {formatDate(date)}
      </span>
    </div>
  );
};

export default DateDivider;