import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';

const MatchesView = () => {
  const { matches } = useStore();
  const navigate = useNavigate();

  const handleMatchClick = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No matches yet</h2>
        <p className="text-gray-600">Start swiping to find your perfect match!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Your Matches ({matches.length})
        </h1>
      </div>

      {/* Matches Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => handleMatchClick(match.id)}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={match.user.photos[0]}
                  alt={match.user.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h3 className="font-semibold">{match.user.name}</h3>
                  <p className="text-xs opacity-75">
                    {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
                  </p>
                </div>
                {match.lastMessage && !match.lastMessage.read && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full" />
                  </div>
                )}
              </div>
              
              {match.lastMessage && (
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {match.lastMessage.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Matches Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Matches</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {matches.slice(0, 10).map((match) => (
            <div
              key={`recent-${match.id}`}
              onClick={() => handleMatchClick(match.id)}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={match.user.photos[0]}
                  alt={match.user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                {match.lastMessage && !match.lastMessage.read && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white" />
                )}
              </div>
              <p className="text-xs text-center mt-1 text-gray-600 truncate w-16">
                {match.user.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesView;