import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { mockUsers, mockMatches } from './data/mockData';
import Navigation from './components/Navigation';
import SwipeView from './components/SwipeView';
import MatchesView from './components/MatchesView';
import ChatView from './components/ChatView';
import ProfileView from './components/ProfileView';

function App() {
  const { setCurrentUser, users } = useStore();

  useEffect(() => {
    // Initialize with mock data
    if (users.length === 0) {
      useStore.setState({ 
        users: mockUsers,
        matches: mockMatches,
        currentUser: {
          id: 'current-user',
          name: 'You',
          age: 25,
          bio: 'Looking for meaningful connections!',
          photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop&crop=face'],
          interests: ['Travel', 'Music', 'Food'],
          location: 'San Francisco, CA',
          verified: true,
          lastActive: new Date().toISOString()
        }
      });
    }
  }, [users.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
        <Routes>
          <Route path="/" element={<SwipeView />} />
          <Route path="/matches" element={<MatchesView />} />
          <Route path="/chat/:matchId" element={<ChatView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
}

export default App;