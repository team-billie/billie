// 채팅방 없을 때 


// src/components/chats/list/EmptyState.tsx
import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  userRole: 'borrower' | 'lender';
}

const EmptyState: React.FC<EmptyStateProps> = ({ userRole }) => {
  const isBorrower = userRole === 'borrower';
  
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-gray-500 mb-6">
        {isBorrower 
          ? '아직 빌린 내역이 없습니다.' 
          : '아직 빌려준 내역이 없습니다.'}
      </p>
      <Link
        href={isBorrower ? '/home' : '/posts/register'}
        className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium"
      >
        {isBorrower ? '물건 빌리러 가기' : '물건 등록하기'}
      </Link>
    </div>
  );
};

export default EmptyState;