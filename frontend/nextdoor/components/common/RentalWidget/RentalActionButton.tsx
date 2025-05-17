// components/RentalActionButton.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RentalActionButtonProps {
  rentalId: number;
  title: string;
  isOwner: boolean;
  productImage?: string;
  profileImage?: string;
  buttonText: string;
  actionLink?: string;
}

const RentalActionButton: React.FC<RentalActionButtonProps> = ({
  rentalId,
  title,
  isOwner,
  productImage = "/icons/icon72.png",
  profileImage = "/images/profileimg.png",
  buttonText,
  actionLink,
}) => {
  return (
    <div className="flex items-center bg-white rounded-2xl p-4 mb-4 border-l-4 border-blue-500 shadow-sm">
      <div className="relative mr-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200">
          <Image
            src={productImage}
            alt={title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-white">
          <Image
            src={profileImage}
            alt="프로필"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0">
        <p className="font-semibold text-black text-base mb-1">안심대여</p>
        <p className="text-sm text-gray-500 truncate">{title}</p>
      </div>

      <div className="flex items-center" style={{ width: "170px" }}>
        {actionLink ? (
          <Link href={actionLink} className="w-full">
            <span className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors inline-block w-full text-center">
              {buttonText}
            </span>
          </Link>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-2.5 rounded-full text-sm font-medium w-full"
          >
            {buttonText}
          </button>
        )}
        <span className="ml-3 text-gray-400">→</span>
      </div>
    </div>
  );
};

export default RentalActionButton;