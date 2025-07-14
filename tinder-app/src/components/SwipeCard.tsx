'use client';

import { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Star, MapPin, Verified } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  index: number;
}

export default function SwipeCard({ profile, onSwipe, index }: SwipeCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0) {
        setExitX(1000);
        onSwipe('right');
      } else {
        setExitX(-1000);
        onSwipe('left');
      }
    } else if (info.offset.y < -threshold || velocity < -500) {
      onSwipe('up'); // Super like
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev < profile.photos.length - 1 ? prev + 1 : 0
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev > 0 ? prev - 1 : profile.photos.length - 1
    );
  };

  return (
    <motion.div
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        x,
        y,
        rotate,
        opacity,
        zIndex: 1000 - index,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ duration: 0.3 }}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Photo indicators */}
        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
          {profile.photos.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full ${
                i === currentPhotoIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Photo navigation areas */}
        <div
          className="absolute left-0 top-0 w-1/2 h-3/4 z-10 cursor-pointer"
          onClick={prevPhoto}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-3/4 z-10 cursor-pointer"
          onClick={nextPhoto}
        />

        {/* Main photo */}
        <div className="relative w-full h-3/4">
          <Image
            src={profile.photos[currentPhotoIndex]}
            alt={profile.name}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          
          {/* Online indicator */}
          {profile.isOnline && (
            <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <span className="text-xl">{profile.age}</span>
            {profile.verified && (
              <Verified className="w-5 h-5 text-blue-400 fill-current" />
            )}
          </div>
          
          <div className="flex items-center gap-1 mb-3 text-gray-200">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{profile.distance} km away</span>
          </div>
          
          <p className="text-sm text-gray-200 mb-3 line-clamp-2">
            {profile.bio}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {profile.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-white/20 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                +{profile.interests.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <motion.button
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSwipe('left')}
          >
            <X className="w-6 h-6 text-red-500" />
          </motion.button>
          
          <motion.button
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSwipe('up')}
          >
            <Star className="w-6 h-6 text-blue-500" />
          </motion.button>
          
          <motion.button
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSwipe('right')}
          >
            <Heart className="w-6 h-6 text-green-500" />
          </motion.button>
        </div>

        {/* Swipe indicators */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: useTransform(x, [50, 150], [0, 1]) }}
        >
          <div className="bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold rotate-12">
            LIKE
          </div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: useTransform(x, [-150, -50], [1, 0]) }}
        >
          <div className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold -rotate-12">
            NOPE
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}