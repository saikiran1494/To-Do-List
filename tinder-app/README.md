# 💕 LoveSwipe - Modern Tinder-like Dating App

A beautiful, optimized Tinder-like dating application built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **🔥 Swipe Functionality**: Smooth card swiping with gesture recognition
- **💝 Smart Matching**: Like, dislike, and super-like profiles
- **💬 Real-time Chat**: Message your matches instantly
- **📱 Mobile-First Design**: Optimized for mobile and desktop
- **🎨 Beautiful UI**: Modern design with smooth animations
- **⚡ Performance Optimized**: Built with Next.js 15 and optimized for speed
- **🔍 Profile Discovery**: Browse through potential matches
- **👤 User Profiles**: Detailed profiles with photos and interests
- **🌟 Interactive Elements**: Engaging animations and micro-interactions

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Handling**: Next.js Image optimization
- **State Management**: React Hooks

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tinder-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
tinder-app/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── SwipeCard.tsx     # Individual swipe card
│   │   ├── SwipeStack.tsx    # Stack of cards manager
│   │   ├── Navigation.tsx    # Bottom navigation
│   │   └── ChatList.tsx      # Chat/matches list
│   ├── data/                 # Mock data
│   │   └── mockData.ts       # Sample profiles and matches
│   └── types/                # TypeScript definitions
│       └── index.ts          # App type definitions
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎯 Key Components

### SwipeCard
- Gesture-based swiping with Framer Motion
- Photo navigation and indicators
- Profile information display
- Action buttons (like, dislike, super-like)
- Visual feedback for swipe actions

### SwipeStack
- Manages multiple cards in a stack
- Handles swipe logic and state
- Smooth card transitions
- End-of-stack handling

### Navigation
- Bottom tab navigation
- Active tab highlighting
- Smooth transitions between sections

### ChatList
- Displays matches and conversations
- Real-time message preview
- Online status indicators
- Time formatting

## 🔧 Customization

### Adding New Profiles
Edit `src/data/mockData.ts` to add more sample profiles:

```typescript
export const mockUsers: Profile[] = [
  {
    id: 'unique-id',
    name: 'Your Name',
    age: 25,
    bio: 'Your bio here...',
    photos: ['photo-url-1', 'photo-url-2'],
    location: 'Your City',
    interests: ['Interest 1', 'Interest 2'],
    verified: true,
    distance: 5,
    isOnline: true,
    lastSeen: new Date()
  },
  // ... more profiles
];
```

### Customizing Colors
The app uses a pink/rose color scheme. To change it, update the Tailwind classes in components:
- Primary: `from-pink-500 to-rose-500`
- Accent: `pink-500`, `rose-500`
- Success: `green-500`
- Error: `red-500`

### Adding New Features
The modular component structure makes it easy to add new features:
1. Create new components in `src/components/`
2. Add new types in `src/types/index.ts`
3. Update the main page logic in `src/app/page.tsx`

## 📱 Mobile Optimization

The app is fully optimized for mobile devices:
- Touch-friendly swipe gestures
- Responsive design
- Optimized image loading
- Mobile viewport configuration
- PWA-ready setup

## 🎨 Design Philosophy

- **Mobile-First**: Designed primarily for mobile with desktop support
- **Minimalist**: Clean, uncluttered interface
- **Intuitive**: Easy-to-understand gestures and interactions
- **Performant**: Smooth 60fps animations
- **Accessible**: Proper focus states and semantic HTML

## 🚀 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components and images load on demand
- **Optimized Animations**: Hardware-accelerated animations with Framer Motion
- **Efficient Rendering**: React's automatic optimization

## 🔮 Future Enhancements

- [ ] Real backend integration
- [ ] Push notifications
- [ ] Video chat functionality
- [ ] Advanced matching algorithms
- [ ] Location-based matching
- [ ] Social media integration
- [ ] Progressive Web App (PWA) features
- [ ] Real-time messaging with WebSockets
- [ ] Photo verification system
- [ ] Premium features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide React](https://lucide.dev/)
- Sample photos from [Unsplash](https://unsplash.com/)

---

Made with ❤️ for the modern dating experience
