import { X, Heart, Star, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

const ActionButtons = ({ onSwipe }: ActionButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-6 p-6 bg-white/80 backdrop-blur-sm">
      {/* Undo */}
      <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
        <RotateCcw className="w-6 h-6 text-gray-600" />
      </button>

      {/* Dislike */}
      <button
        onClick={() => onSwipe('left')}
        className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-all hover:scale-110 active:scale-95"
      >
        <X className="w-7 h-7 text-red-500" />
      </button>

      {/* Super Like */}
      <button
        onClick={() => onSwipe('up')}
        className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-all hover:scale-110 active:scale-95"
      >
        <Star className="w-6 h-6 text-blue-500" />
      </button>

      {/* Like */}
      <button
        onClick={() => onSwipe('right')}
        className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-all hover:scale-110 active:scale-95"
      >
        <Heart className="w-7 h-7 text-green-500" />
      </button>

      {/* Boost */}
      <button className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
      </button>
    </div>
  );
};

export default ActionButtons;