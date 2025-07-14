'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, User, Settings, Flame } from 'lucide-react';

interface NavigationProps {
  currentTab: 'discover' | 'matches' | 'messages' | 'profile' | 'settings';
  onTabChange: (tab: 'discover' | 'matches' | 'messages' | 'profile' | 'settings') => void;
}

export default function Navigation({ currentTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'discover', icon: Flame, label: 'Discover' },
    { id: 'matches', icon: Heart, label: 'Matches' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const;

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-2">
      <div className="flex justify-around items-center">
        {tabs.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
              currentTab === id 
                ? 'text-pink-500' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange(id)}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
            {currentTab === id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 w-1 h-1 bg-pink-500 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}