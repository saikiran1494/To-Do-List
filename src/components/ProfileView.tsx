import { useState } from 'react';
import { Settings, Edit3, MapPin, Heart, Star, Users } from 'lucide-react';
import { useStore } from '../store/useStore';

const ProfileView = () => {
  const { currentUser, matches, swipeHistory } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile not found</h2>
        <p className="text-gray-600">Please set up your profile first.</p>
      </div>
    );
  }

  const stats = {
    matches: matches.length,
    likes: swipeHistory.filter(s => s.action === 'like').length,
    superLikes: swipeHistory.filter(s => s.action === 'superlike').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="relative">
            <img
              src={currentUser.photos[0]}
              alt={currentUser.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentUser.location}</span>
              </div>
            </div>
            <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Edit3 className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 mb-4">{currentUser.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentUser.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.matches}</div>
            <div className="text-sm text-gray-600">Matches</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.likes}</div>
            <div className="text-sm text-gray-600">Likes Given</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.superLikes}</div>
            <div className="text-sm text-gray-600">Super Likes</div>
          </div>
        </div>

        {/* Additional Photos */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {currentUser.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            {currentUser.photos.length < 6 && (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-2xl text-gray-400 mb-1">+</div>
                  <div className="text-xs text-gray-500">Add Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;