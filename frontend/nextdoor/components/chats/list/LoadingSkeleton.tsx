// 로딩중일때 

// src/components/chats/list/LoadingSkeleton.tsx

"use client"


import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-start p-3 animate-pulse">
          <div className="flex-shrink-0 mr-3 relative">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            
            <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gray-200 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          
          {Math.random() > 0.6 && (
            <div className="ml-2 w-6 h-6 bg-gray-200 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;