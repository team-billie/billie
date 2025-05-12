// 순수하게 접고 펼치는 기능만 가진 아코디언
import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: ReactNode; // 헤더 부분 (항상 보이는 부분)
  children: ReactNode; // 확장 시 보이는 내용
  className?: string;
  defaultExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className = '',
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-white border-b ${className}`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">{title}</div>
        <button 
          className="p-1"
          aria-label={isExpanded ? '접기' : '펼치기'}
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;