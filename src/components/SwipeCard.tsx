import { motion, PanInfo } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Verified, Heart, X, Star } from 'lucide-react';
import { User } from '../types';

interface SwipeCardProps {
  user: User;
  index: number;
  onSwipe: (userId: string, direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
}

const SwipeCard = ({ user, index, onSwipe, isTop }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const { offset, velocity } = info;

    if (offset.y < -threshold || velocity.y < -500) {
      setExitX(0);
      onSwipe(user.id, 'up'); // Super like
    } else if (offset.x > threshold || velocity.x > 500) {
      setExitX(1000);
      onSwipe(user.id, 'right'); // Like
    } else if (offset.x < -threshold || velocity.x < -500) {
      setExitX(-1000);
      onSwipe(user.id, 'left'); // Dislike
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev < user.photos.length - 1 ? prev + 1 : 0
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev > 0 ? prev - 1 : user.photos.length - 1
    );
  };

  return (
    <motion.div
      className={`swipe-card absolute w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing ${
        isTop ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
      }`}
      style={{
        scale: isTop ? 1 : 0.95 - index * 0.05,
        y: index * 10,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, rotate: exitX > 0 ? 30 : -30, opacity: 0 } : {}}
      transition={{ duration: 0.3 }}
      whileDrag={{ rotate: 0, scale: 1.05 }}
    >
      {/* Photo */}
      <div className="relative h-2/3 overflow-hidden">
        <img
          src={user.photos[currentPhotoIndex]}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        
        {/* Photo indicators */}
        {user.photos.length > 1 && (
          <div className="absolute top-2 left-2 right-2 flex gap-1">
            {user.photos.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${
                  i === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo navigation */}
        <div className="absolute inset-0 flex">
          <div className="flex-1" onClick={prevPhoto} />
          <div className="flex-1" onClick={nextPhoto} />
        </div>

        {/* Swipe indicators */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl opacity-0 rotate-12 transform">
            <Heart className="inline mr-2" />
            LIKE
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl opacity-0 -rotate-12 transform">
            <X className="inline mr-2" />
            NOPE
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-xl opacity-0 transform">
            <Star className="inline mr-2" />
            SUPER LIKE
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 h-1/3">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            {user.name}, {user.age}
          </h3>
          {user.verified && (
            <Verified className="w-5 h-5 text-blue-500 fill-current" />
          )}
        </div>
        
        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.location}</span>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2">{user.bio}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {user.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;