import { motion } from 'motion/react';
import { getTopLocations, calculateOverallScore } from '../data/locations';

interface DailyRecommendationsProps {
  isDarkMode: boolean;
}

export function DailyRecommendations({ isDarkMode }: DailyRecommendationsProps) {
  const topLocations = getTopLocations(3);

  return (
    <motion.div
      className={`rounded-3xl backdrop-blur-xl border p-6 h-full ${
        isDarkMode
          ? 'bg-slate-900/40 border-slate-700/50'
          : 'bg-white/70 border-slate-200'
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        {/* Custom trophy design */}
        <motion.div
          className="relative w-12 h-12"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl"
            style={{ 
              clipPath: 'polygon(50% 0%, 70% 25%, 100% 25%, 75% 50%, 85% 100%, 50% 75%, 15% 100%, 25% 50%, 0% 25%, 30% 25%)',
              boxShadow: '0 4px 20px rgba(251, 146, 60, 0.5)',
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-white" />
          </motion.div>
        </motion.div>
        <div>
          <h2
            className={`text-2xl ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Tonight's Picks
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Prime stargazing locations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {topLocations.map((location, index) => {
          const score = calculateOverallScore(location);
          const rankColors = [
            { bg: 'from-amber-400 to-orange-500', ring: 'border-amber-400' },
            { bg: 'from-slate-300 to-slate-400', ring: 'border-slate-400' },
            { bg: 'from-orange-400 to-orange-600', ring: 'border-orange-500' },
          ];

          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                scale: 1.03,
                x: -5,
              }}
              className={`relative p-5 rounded-2xl backdrop-blur-sm border cursor-pointer overflow-hidden ${
                isDarkMode
                  ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60'
                  : 'bg-white/60 border-slate-200 hover:bg-white/90'
              }`}
            >
              {/* Rank Badge - custom design */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              >
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${rankColors[index].bg} flex items-center justify-center`}
                  style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                >
                  <span className="text-white text-xl">{index + 1}</span>
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${rankColors[index].ring} opacity-50`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </motion.div>

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 opacity-5 bg-gradient-to-br ${rankColors[index].bg}`}
              />

              <div className="relative pr-12">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3
                      className={`text-lg mb-1 ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {/* Custom location marker */}
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'
                      }`} />
                      <span
                        className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {location.district}
                      </span>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <motion.div
                    className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${
                      score >= 90
                        ? 'from-emerald-500 to-teal-500'
                        : 'from-blue-500 to-cyan-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    style={{
                      boxShadow: score >= 90
                        ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                        : '0 4px 12px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <span className="text-white">{score}</span>
                  </motion.div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div
                    className={`text-center p-2.5 rounded-xl backdrop-blur-sm ${
                      isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {/* Custom star */}
                      <motion.div
                        className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        ★
                      </motion.div>
                    </div>
                    <p
                      className={`text-xs mb-0.5 ${
                        isDarkMode ? 'text-blue-300' : 'text-blue-700'
                      }`}
                    >
                      Stars
                    </p>
                    <p
                      className={`${
                        isDarkMode ? 'text-blue-200' : 'text-blue-900'
                      }`}
                    >
                      {location.starVisibility}%
                    </p>
                  </div>

                  <div
                    className={`text-center p-2.5 rounded-xl backdrop-blur-sm ${
                      isDarkMode ? 'bg-slate-500/10 border border-slate-500/20' : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <motion.div
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${
                          isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
                        } opacity-70`} />
                      </motion.div>
                    </div>
                    <p
                      className={`text-xs mb-0.5 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Cloud
                    </p>
                    <p
                      className={`${
                        isDarkMode ? 'text-slate-200' : 'text-slate-900'
                      }`}
                    >
                      {location.cloudCover}%
                    </p>
                  </div>

                  <div
                    className={`text-center p-2.5 rounded-xl backdrop-blur-sm ${
                      isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          isDarkMode ? 'bg-amber-400' : 'bg-amber-600'
                        }`}
                        animate={{
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          boxShadow: isDarkMode 
                            ? '0 0 10px rgba(251, 191, 36, 0.6)' 
                            : '0 0 8px rgba(217, 119, 6, 0.5)',
                        }}
                      />
                    </div>
                    <p
                      className={`text-xs mb-0.5 ${
                        isDarkMode ? 'text-amber-300' : 'text-amber-700'
                      }`}
                    >
                      Light
                    </p>
                    <p
                      className={`${
                        isDarkMode ? 'text-amber-200' : 'text-amber-900'
                      }`}
                    >
                      {location.lightPollution}%
                    </p>
                  </div>
                </div>

                {/* Best Time with custom clock */}
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isDarkMode ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'
                  }`}
                >
                  <div className="relative w-5 h-5">
                    <div className={`absolute inset-0 rounded-full border-2 ${
                      isDarkMode ? 'border-indigo-400' : 'border-indigo-600'
                    }`} />
                    <motion.div
                      className={`absolute top-1/2 left-1/2 w-0.5 h-2 -ml-px -mt-2 ${
                        isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'
                      } origin-bottom`}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{ transformOrigin: '1px 8px' }}
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-indigo-300' : 'text-indigo-700'
                    }`}
                  >
                    Optimal: {location.bestTime}
                  </span>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {location.features.slice(0, 2).map((feature, i) => (
                    <motion.span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + i * 0.1 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Indicator */}
      <motion.div
        className={`mt-6 p-4 rounded-xl backdrop-blur-sm ${
          isDarkMode
            ? 'bg-emerald-500/10 border border-emerald-500/30'
            : 'bg-emerald-50 border border-emerald-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <span
            className={`text-sm ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}
          >
            Live Data • Updated 2 min ago
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
