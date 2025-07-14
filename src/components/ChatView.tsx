import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';

const ChatView = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { matches, addMessage } = useStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const match = matches.find(m => m.id === matchId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [match?.lastMessage]);

  const handleSendMessage = () => {
    if (!message.trim() || !match) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      text: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    addMessage(match.id, newMessage);
    setMessage('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        "That sounds amazing! 😊",
        "I'd love to hear more about that!",
        "Haha, you're funny! 😄",
        "That's so cool! Tell me more.",
        "I completely agree!",
        "What do you think about trying that new place?",
        "I'm free this weekend if you'd like to meet up!",
      ];
      
      const responseMessage = {
        id: `msg-${Date.now()}-response`,
        senderId: match.user.id,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        read: false
      };

      addMessage(match.id, responseMessage);
    }, 2000);
  };

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Match not found</h2>
        <p className="text-gray-600">This conversation might have been deleted.</p>
      </div>
    );
  }

  // Mock messages for demo
  const messages = [
    {
      id: 'msg1',
      senderId: match.user.id,
      text: match.lastMessage?.text || "Hey! Thanks for the match! 😊",
      timestamp: '2024-01-15T09:15:00Z',
      read: true
    },
    {
      id: 'msg2',
      senderId: 'current-user',
      text: "Hi! Great to match with you too! I saw you love hiking - what's your favorite trail?",
      timestamp: '2024-01-15T09:30:00Z',
      read: true
    },
    {
      id: 'msg3',
      senderId: match.user.id,
      text: "I love the trails around Marin Headlands! The views are incredible. Do you hike often?",
      timestamp: '2024-01-15T10:15:00Z',
      read: true
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
        <button 
          onClick={() => navigate('/matches')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <img
          src={match.user.photos[0]}
          alt={match.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h2 className="font-semibold text-gray-800">{match.user.name}</h2>
          <p className="text-sm text-gray-500">
            Matched {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
          </p>
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => {
          const isOwnMessage = msg.senderId === 'current-user';
          
          return (
            <div
              key={msg.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isOwnMessage
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-pink-100' : 'text-gray-500'
                }`}>
                  {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;