import React from 'react';
import Image from 'next/image';

interface ProfileIconProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ 
  src, 
  alt = '프로필 이미지', 
  size = 40,
  className = ''
}) => {
  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image 
          src={src} 
          alt={alt} 
          width={size} 
          height={size}
          className="object-cover"
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600"
          style={{ fontSize: size * 0.4 }}
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;