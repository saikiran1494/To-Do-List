export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  interests: string[];
  location: string;
  verified: boolean;
  lastActive: string;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: string;
}

export interface SwipeAction {
  userId: string;
  action: 'like' | 'dislike' | 'superlike';
  timestamp: string;
}