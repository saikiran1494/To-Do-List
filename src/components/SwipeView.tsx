import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import SwipeCard from './SwipeCard';
import ActionButtons from './ActionButtons';
import { User } from '../types';
import toast from 'react-hot-toast';

const SwipeView = () => {
  const { users, removeUser, addSwipeAction, addMatch } = useStore();
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  useEffect(() => {
    setCurrentUsers(users.slice(0, 3)); // Show max 3 cards at once
  }, [users]);

  const handleSwipe = (userId: string, direction: 'left' | 'right' | 'up') => {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) return;

    const action = direction === 'right' ? 'like' : direction === 'up' ? 'superlike' : 'dislike';
    
    addSwipeAction({
      userId,
      action,
      timestamp: new Date().toISOString()
    });

    if (action === 'like' || action === 'superlike') {
      // Simulate match (30% chance)
      if (Math.random() > 0.7) {
        addMatch({
          id: `match-${Date.now()}`,
          user,
          matchedAt: new Date().toISOString()
        });
        toast.success(`It's a match with ${user.name}! 💕`, {
          duration: 4000,
          style: {
            background: '#ec4899',
            color: 'white',
          },
        });
      } else if (action === 'superlike') {
        toast.success(`Super liked ${user.name}! ⭐`, {
          style: {
            background: '#3b82f6',
            color: 'white',
          },
        });
      }
    }

    removeUser(userId);
    
    // Add next user to the stack
    const nextUserIndex = users.findIndex(u => u.id === userId) + 3;
    if (nextUserIndex < users.length) {
      setCurrentUsers(prev => [...prev.filter(u => u.id !== userId), users[nextUserIndex]]);
    } else {
      setCurrentUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  if (currentUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No more profiles</h2>
        <p className="text-gray-600">Check back later for new people in your area!</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 to-pink-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
          DateConnect
        </div>
        <div className="text-sm text-gray-600">
          {users.length} people nearby
        </div>
      </div>

      {/* Card Stack */}
      <div className="card-stack relative flex-1 flex items-center justify-center p-4">
        <AnimatePresence>
          {currentUsers.map((user, index) => (
            <SwipeCard
              key={user.id}
              user={user}
              index={index}
              onSwipe={handleSwipe}
              isTop={index === currentUsers.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <ActionButtons 
        onSwipe={(direction) => {
          const topUser = currentUsers[currentUsers.length - 1];
          if (topUser) {
            handleSwipe(topUser.id, direction);
          }
        }}
      />
    </div>
  );
};

export default SwipeView;