import React from 'react';

interface AvatarProps {
  imageUrl: string;
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, username }) => {
  return (
    <div className="flex items-center">
      <img src={imageUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
      <div className="ml-3">
        <p className="text-lg font-bold">{username}</p>
      </div>
    </div>
  );
};

export default Avatar;
