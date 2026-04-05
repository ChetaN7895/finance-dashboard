import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SummaryCard = ({ title, amount, change, icon, trend }) => {
  const Icon = icon;
  const isPositive = trend === 'up';

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1">
            ${amount.toLocaleString()}
          </p>

          <div className={`flex items-center mt-2 text-xs sm:text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <FaArrowUp className="mr-1" />
            ) : (
              <FaArrowDown className="mr-1" />
            )}
            <span>{change}% from last month</span>
          </div>
        </div>

        {/* Icon */}
        <div className={`mt-3 sm:mt-0 p-3 rounded-full ${
          isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

      </div>
    </div>
  );
};

export default SummaryCard;