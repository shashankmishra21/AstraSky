import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardHeader } from './components/DashboardHeader';
import { MetricsOverview } from './components/MetricsOverview';
import { LocationMap } from './components/LocationMap';
import { LocationCards } from './components/LocationCards';
import { DailyRecommendations } from './components/DailyRecommendations';
import { ComparisonView } from './components/ComparisonView';
import { StarfieldBackground } from './components/StarfieldBackground';
import { NotificationSystem } from './components/NotificationSystem';
import { FloatingStars } from './components/FloatingStars';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(locationId)) {
        return prev.filter(id => id !== locationId);
      }
      if (prev.length < 2) {
        return [...prev, locationId];
      }
      return [prev[1], locationId];
    });
  };

  useEffect(() => {
    if (selectedLocations.length === 2) {
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  }, [selectedLocations]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50'
    }`}>
      <StarfieldBackground isDarkMode={isDarkMode} />
      <FloatingStars />
      <NotificationSystem isDarkMode={isDarkMode} />
      
      {/* Custom Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 w-20 h-20 rounded-full backdrop-blur-xl border transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-900/60'
            : 'bg-white/60 border-slate-300/50 hover:bg-white/80'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400 }}
        style={{
          boxShadow: isDarkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="night"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Crescent moon */}
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400"
                  style={{ boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}
                />
                <div className="absolute inset-0 rounded-full bg-slate-950"
                  style={{ clipPath: 'ellipse(55% 60% at 65% 50%)' }}
                />
              </div>
              {/* Stars around moon */}
              <motion.div
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-yellow-300"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-yellow-300"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="day"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Sun */}
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
                  style={{ boxShadow: '0 0 25px rgba(251, 146, 60, 0.6)' }}
                />
                {/* Sun rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-gradient-to-t from-amber-400 to-transparent origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                    }}
                    animate={{
                      scaleY: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <DashboardHeader isDarkMode={isDarkMode} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MetricsOverview isDarkMode={isDarkMode} />
          </motion.div>

          {/* Add About and Featured Sites sections here */}
          <AboutSection />
         
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LocationMap 
                isDarkMode={isDarkMode}
                selectedLocations={selectedLocations}
                onLocationSelect={handleLocationSelect}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <DailyRecommendations isDarkMode={isDarkMode} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LocationCards 
              isDarkMode={isDarkMode}
              selectedLocations={selectedLocations}
              onLocationSelect={handleLocationSelect}
            />
          </motion.div>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <ComparisonView 
                  isDarkMode={isDarkMode}
                  locationIds={selectedLocations}
                  onClose={() => setSelectedLocations([])}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  )
}   