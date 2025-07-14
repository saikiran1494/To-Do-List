export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: string;
  interests: string[];
  verified: boolean;
  distance?: number;
}

export interface Profile extends User {
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Match {
  id: string;
  users: [string, string];
  timestamp: Date;
  lastMessage?: Message;
  isActive: boolean;
}

export interface SwipeAction {
  userId: string;
  targetId: string;
  action: 'like' | 'dislike' | 'superlike';
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  matchId: string;
  messages: Message[];
  participants: User[];
  lastActivity: Date;
}