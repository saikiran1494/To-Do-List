'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, Heart } from 'lucide-react';
import { Match, Profile } from '@/types';

interface ChatListProps {
  matches: Match[];
  profiles: Profile[];
  onChatSelect: (match: Match) => void;
}

export default function ChatList({ matches, profiles, onChatSelect }: ChatListProps) {
  const getProfileById = (id: string) => {
    return profiles.find(p => p.id === id);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) {
      return `${Math.floor(diff / (1000 * 60))}m`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`;
    } else {
      return `${Math.floor(hours / 24)}d`;
    }
  };

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            💝
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No matches yet
          </h2>
          <p className="text-gray-600 mb-6">
            Keep swiping to find your perfect match!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold"
          >
            <Heart className="w-5 h-5" />
            Start Swiping
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-600">{matches.length} matches</p>
      </div>

      <div className="divide-y divide-gray-200">
        {matches.map((match) => {
          const otherUserId = match.users.find(id => id !== 'user1');
          const otherUser = getProfileById(otherUserId || '');
          
          if (!otherUser) return null;

          return (
            <motion.div
              key={match.id}
              className="bg-white p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              whileTap={{ scale: 0.98 }}
              onClick={() => onChatSelect(match)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={otherUser.photos[0]}
                    alt={otherUser.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  {otherUser.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {otherUser.name}
                    </h3>
                    {match.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTime(match.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  {match.lastMessage ? (
                    <p className="text-sm text-gray-600 truncate">
                      {match.lastMessage.senderId === 'user1' ? 'You: ' : ''}
                      {match.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Say hello! 👋
                    </p>
                  )}
                </div>

                {match.lastMessage && !match.lastMessage.read && match.lastMessage.senderId !== 'user1' && (
                  <div className="w-3 h-3 bg-pink-500 rounded-full flex-shrink-0" />
                )}

                <MessageCircle className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}