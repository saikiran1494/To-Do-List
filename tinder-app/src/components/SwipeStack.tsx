'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { Profile } from '@/types';

interface SwipeStackProps {
  profiles: Profile[];
  onMatch: (profile: Profile) => void;
  onPass: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
}

export default function SwipeStack({ profiles, onMatch, onPass, onSuperLike }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= profiles.length) return;

    const currentProfile = profiles[currentIndex];

    switch (direction) {
      case 'left':
        onPass(currentProfile);
        break;
      case 'right':
        onMatch(currentProfile);
        break;
      case 'up':
        onSuperLike(currentProfile);
        break;
    }

    setCurrentIndex(prev => prev + 1);
  };

  const visibleCards = profiles.slice(currentIndex, currentIndex + 3);

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No more profiles!
          </h2>
          <p className="text-gray-600 mb-6">
            Check back later for more matches in your area.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold"
            onClick={() => setCurrentIndex(0)}
          >
            Start Over
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative p-4">
      <div className="relative w-full max-w-sm mx-auto h-[600px]">
        <AnimatePresence>
          {visibleCards.map((profile, index) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              onSwipe={handleSwipe}
              index={index}
            />
          )).reverse()}
        </AnimatePresence>
      </div>

      {/* Match notification */}
      <AnimatePresence>
        {/* You can add match notification animation here */}
      </AnimatePresence>
    </div>
  );
}