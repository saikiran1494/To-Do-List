import { User, Profile, Message, Match } from '@/types';

export const mockUsers: Profile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 26,
    bio: 'Adventure seeker 🏔️ Love hiking, photography, and good coffee. Looking for someone to explore the world with!',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'San Francisco, CA',
    interests: ['Hiking', 'Photography', 'Travel', 'Coffee'],
    verified: true,
    distance: 3,
    isOnline: true,
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'Emily Chen',
    age: 24,
    bio: 'Artist and yoga instructor ✨ Passionate about mindfulness, creativity, and living life to the fullest.',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Los Angeles, CA',
    interests: ['Yoga', 'Art', 'Meditation', 'Dancing'],
    verified: true,
    distance: 12,
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: '3',
    name: 'Jessica Park',
    age: 28,
    bio: 'Foodie, book lover, and weekend warrior 📚🍕 Looking for someone who can make me laugh and try new restaurants with.',
    photos: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'New York, NY',
    interests: ['Food', 'Books', 'Movies', 'Music'],
    verified: false,
    distance: 8,
    isOnline: true,
    lastSeen: new Date()
  },
  {
    id: '4',
    name: 'Mia Rodriguez',
    age: 25,
    bio: 'Fitness enthusiast and dog mom 🐕 Always down for a workout or a Netflix binge. Swipe right if you love dogs!',
    photos: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Austin, TX',
    interests: ['Fitness', 'Dogs', 'Netflix', 'Cooking'],
    verified: true,
    distance: 5,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '5',
    name: 'Anna Thompson',
    age: 27,
    bio: 'Tech professional by day, salsa dancer by night 💃 Love exploring new cultures and cuisines.',
    photos: [
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Seattle, WA',
    interests: ['Technology', 'Dancing', 'Travel', 'Food'],
    verified: true,
    distance: 15,
    isOnline: true,
    lastSeen: new Date()
  }
];

export const mockMatches: Match[] = [
  {
    id: 'match1',
    users: ['user1', '2'],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isActive: true,
    lastMessage: {
      id: 'msg1',
      senderId: '2',
      receiverId: 'user1',
      content: 'Hey! Love your hiking photos 😊',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    }
  },
  {
    id: 'match2',
    users: ['user1', '4'],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isActive: true,
    lastMessage: {
      id: 'msg2',
      senderId: 'user1',
      receiverId: '4',
      content: 'Would love to check out that new coffee place!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    }
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: '2',
    receiverId: 'user1',
    content: 'Hey! Love your hiking photos 😊',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: 'msg2',
    senderId: 'user1',
    receiverId: '2',
    content: 'Thanks! That was from my trip to Yosemite last weekend',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    read: true
  },
  {
    id: 'msg3',
    senderId: '2',
    receiverId: 'user1',
    content: 'Amazing! I\'ve been wanting to go there. Any recommendations?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: true
  }
];