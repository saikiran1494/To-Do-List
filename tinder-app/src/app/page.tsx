'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeStack from '@/components/SwipeStack';
import Navigation from '@/components/Navigation';
import ChatList from '@/components/ChatList';
import { mockUsers, mockMatches } from '@/data/mockData';
import { Profile, Match } from '@/types';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<'discover' | 'matches' | 'messages' | 'profile' | 'settings'>('discover');
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [profiles] = useState<Profile[]>(mockUsers);

  const handleMatch = (profile: Profile) => {
    console.log('Matched with:', profile.name);
    // In a real app, you'd send this to your backend
    // and check if it's a mutual match
    
    // For demo purposes, create a new match
    const newMatch: Match = {
      id: `match_${Date.now()}`,
      users: ['user1', profile.id],
      timestamp: new Date(),
      isActive: true
    };
    
    setMatches(prev => [newMatch, ...prev]);
    
    // Show match animation (you could add this)
    console.log('New match created!');
  };

  const handlePass = (profile: Profile) => {
    console.log('Passed on:', profile.name);
    // In a real app, you'd record this action
  };

  const handleSuperLike = (profile: Profile) => {
    console.log('Super liked:', profile.name);
    // In a real app, this would be a special action with limited uses
    handleMatch(profile); // For demo, treat as instant match
  };

  const handleChatSelect = (match: Match) => {
    console.log('Selected chat:', match.id);
    // In a real app, you'd navigate to the chat interface
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'discover':
        return (
          <div className="flex-1 bg-gradient-to-br from-pink-50 to-orange-50">
            <SwipeStack
              profiles={profiles}
              onMatch={handleMatch}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
            />
          </div>
        );
        
      case 'matches':
      case 'messages':
        return (
          <ChatList
            matches={matches}
            profiles={profiles}
            onChatSelect={handleChatSelect}
          />
        );
        
      case 'profile':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                👤
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Profile Settings
              </h2>
              <p className="text-gray-600">
                Edit your profile, photos, and preferences
              </p>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                ⚙️
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Settings
              </h2>
              <p className="text-gray-600">
                Privacy, notifications, and account settings
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <main className="h-screen flex flex-col bg-white">
      {/* Header */}
      <motion.header 
        className="bg-white border-b border-gray-200 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">💕</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              LoveSwipe
            </h1>
          </motion.div>
          
          {currentTab === 'discover' && (
            <motion.div
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {profiles.length} profiles nearby
            </motion.div>
          )}
          
          {(currentTab === 'matches' || currentTab === 'messages') && (
            <motion.div
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {matches.length} matches
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-hidden"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </main>
  );
}
