import { User, Match } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emily Chen',
    age: 26,
    bio: 'Adventure seeker 🏔️ | Coffee enthusiast ☕ | Dog lover 🐕 | Always up for trying new restaurants!',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1523245318018-af6e1c4c4fa2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=600&fit=crop'
    ],
    interests: ['Travel', 'Photography', 'Hiking', 'Cooking'],
    location: 'San Francisco, CA',
    verified: true,
    lastActive: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    age: 29,
    bio: 'Musician by night 🎸 | Software engineer by day 💻 | Love live music and good conversation!',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=600&fit=crop'
    ],
    interests: ['Music', 'Technology', 'Concerts', 'Guitar'],
    location: 'Austin, TX',
    verified: true,
    lastActive: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    age: 24,
    bio: 'Yoga instructor 🧘‍♀️ | Foodie 🍜 | Sunset chaser 🌅 | Looking for genuine connections!',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop'
    ],
    interests: ['Yoga', 'Meditation', 'Healthy Cooking', 'Beach'],
    location: 'Miami, FL',
    verified: false,
    lastActive: '2024-01-15T11:45:00Z'
  },
  {
    id: '4',
    name: 'Alex Thompson',
    age: 31,
    bio: 'Rock climber 🧗‍♂️ | Startup founder 🚀 | Weekend warrior | Let\'s explore the world together!',
    photos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop'
    ],
    interests: ['Rock Climbing', 'Entrepreneurship', 'Travel', 'Fitness'],
    location: 'Denver, CO',
    verified: true,
    lastActive: '2024-01-15T08:20:00Z'
  },
  {
    id: '5',
    name: 'Isabella Kim',
    age: 27,
    bio: 'Art teacher 🎨 | Bookworm 📚 | Wine lover 🍷 | Seeking someone to share cozy nights with!',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=600&fit=crop'
    ],
    interests: ['Art', 'Reading', 'Museums', 'Wine Tasting'],
    location: 'New York, NY',
    verified: true,
    lastActive: '2024-01-15T12:00:00Z'
  }
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    user: {
      id: '6',
      name: 'David Park',
      age: 28,
      bio: 'Chef 👨‍🍳 | Foodie | Love cooking for others!',
      photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'],
      interests: ['Cooking', 'Food', 'Travel'],
      location: 'Los Angeles, CA',
      verified: true,
      lastActive: '2024-01-15T13:30:00Z'
    },
    matchedAt: '2024-01-14T15:30:00Z',
    lastMessage: {
      id: 'msg1',
      senderId: '6',
      text: 'Hey! I saw you love trying new restaurants. Want to check out that new Italian place downtown?',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    }
  },
  {
    id: 'm2',
    user: {
      id: '7',
      name: 'Luna Martinez',
      age: 25,
      bio: 'Dancer 💃 | Fitness enthusiast | Beach lover 🏖️',
      photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face'],
      interests: ['Dancing', 'Fitness', 'Beach'],
      location: 'San Diego, CA',
      verified: false,
      lastActive: '2024-01-15T11:20:00Z'
    },
    matchedAt: '2024-01-13T20:45:00Z',
    lastMessage: {
      id: 'msg2',
      senderId: '7',
      text: 'Thanks for the super like! 😊',
      timestamp: '2024-01-14T08:30:00Z',
      read: true
    }
  }
];