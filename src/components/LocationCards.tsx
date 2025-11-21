import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { locations, calculateOverallScore } from '../data/locations';

interface LocationCardsProps {
  isDarkMode: boolean;
  selectedLocations: string[];
  onLocationSelect: (locationId: string) => void;
}

export function LocationCards({
  isDarkMode,
  selectedLocations,
  onLocationSelect,
}: LocationCardsProps) {

  const generateSparklineData = (baseValue: number) => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: baseValue + Math.random() * 10 - 5,
    }));
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className={`text-3xl ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Observation Sites
          </h2>
          <p
            className={`text-sm mt-2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Select up to two locations for detailed comparison
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {locations.map((location, index) => {
          const score = calculateOverallScore(location);
          const isSelected = selectedLocations.includes(location.id);
          const sparklineData = generateSparklineData(location.starVisibility);

          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                rotateX: 5,
                scale: 1.02,
              }}
              onClick={() => onLocationSelect(location.id)}
              className="relative group cursor-pointer"
              style={{ perspective: 1500 }}
            >
              <div
                className={`relative rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-cyan-500/20 border-cyan-500/60 shadow-2xl shadow-cyan-500/30'
                      : 'bg-cyan-100 border-cyan-400 shadow-2xl shadow-cyan-500/30'
                    : isDarkMode
                    ? 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-900/60 hover:border-slate-600/60'
                    : 'bg-white/70 border-slate-200 hover:bg-white/90'
                }`}
                style={{
                  boxShadow: isSelected 
                    ? isDarkMode 
                      ? '0 20px 60px rgba(34, 211, 238, 0.3)' 
                      : '0 20px 60px rgba(34, 211, 238, 0.2)'
                    : undefined,
                }}
              >
                {/* Animated gradient orb */}
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${
                    isSelected
                      ? 'bg-cyan-500/40'
                      : score >= 90
                      ? 'bg-emerald-500/30'
                      : score >= 80
                      ? 'bg-blue-500/30'
                      : 'bg-indigo-500/30'
                  }`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                />

                {/* Selection indicator - custom checkmark */}
                {isSelected && (
                  <motion.div
                    className="absolute top-4 right-4 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
                      style={{ boxShadow: '0 4px 20px rgba(34, 211, 238, 0.5)' }}
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                <div className="relative p-6">
                  {/* Header */}
                  <div className="mb-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3
                          className={`text-xl mb-2 ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-900'
                          }`}
                        >
                          {location.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-1">
                          {/* Custom location pin */}
                          <div className="relative w-4 h-4">
                            <div className={`absolute inset-0 rounded-full ${
                              isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'
                            }`}
                            style={{ 
                              clipPath: 'path("M10 0C6.134 0 3 3.134 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z")',
                              transform: 'scale(0.3)',
                            }}
                            />
                          </div>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {location.district}
                          </p>
                        </div>
                      </div>

                      {/* Score badge with orbit animation */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={`relative px-4 py-2 rounded-2xl text-white ${
                          score >= 90
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : score >= 80
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{
                          boxShadow: score >= 90
                            ? '0 4px 15px rgba(16, 185, 129, 0.4)'
                            : score >= 80
                            ? '0 4px 15px rgba(59, 130, 246, 0.4)'
                            : '0 4px 15px rgba(99, 102, 241, 0.4)',
                        }}
                        >
                          {score}
                        </div>
                        {/* Orbital ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl border-2 ${
                            score >= 90
                              ? 'border-emerald-400'
                              : score >= 80
                              ? 'border-blue-400'
                              : 'border-indigo-400'
                          } opacity-40`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {location.description}
                    </p>
                  </div>

                  {/* Sparkline Chart */}
                  <div className="mb-5 h-20 -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparklineData}>
                        <defs>
                          <linearGradient id={`gradient-${location.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor={
                                score >= 90
                                  ? '#10b981'
                                  : score >= 80
                                  ? '#3b82f6'
                                  : '#6366f1'
                              }
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="100%"
                              stopColor={
                                score >= 90
                                  ? '#10b981'
                                  : score >= 80
                                  ? '#3b82f6'
                                  : '#6366f1'
                              }
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <RechartsTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div
                                  className={`px-3 py-2 rounded-lg backdrop-blur-xl border ${
                                    isDarkMode
                                      ? 'bg-slate-900/90 border-slate-700'
                                      : 'bg-white/90 border-slate-200'
                                  }`}
                                >
                                  <p
                                    className={`text-xs ${
                                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                                    }`}
                                  >
                                    {Math.round(payload[0].value as number)}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={
                            score >= 90
                              ? '#10b981'
                              : score >= 80
                              ? '#3b82f6'
                              : '#6366f1'
                          }
                          strokeWidth={2}
                          fill={`url(#gradient-${location.id})`}
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Star Visibility */}
                    <div
                      className={`p-3 rounded-xl backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                        <span
                          className={`text-xs ${
                            isDarkMode ? 'text-blue-300' : 'text-blue-700'
                          }`}
                        >
                          Stars
                        </span>
                      </div>
                      <p
                        className={`${
                          isDarkMode ? 'text-blue-200' : 'text-blue-900'
                        }`}
                      >
                        {location.starVisibility}%
                      </p>
                    </div>

                    {/* Cloud Cover */}
                    <div
                      className={`p-3 rounded-xl backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-slate-500/10 border border-slate-500/20'
                          : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
                        }`} />
                        <span
                          className={`text-xs ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          Cloud
                        </span>
                      </div>
                      <p
                        className={`${
                          isDarkMode ? 'text-slate-200' : 'text-slate-900'
                        }`}
                      >
                        {location.cloudCover}%
                      </p>
                    </div>

                    {/* Light Pollution */}
                    <div
                      className={`p-3 rounded-xl backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-amber-500/10 border border-amber-500/20'
                          : 'bg-amber-50 border border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-amber-400' : 'bg-amber-600'
                        }`} />
                        <span
                          className={`text-xs ${
                            isDarkMode ? 'text-amber-300' : 'text-amber-700'
                          }`}
                        >
                          Light
                        </span>
                      </div>
                      <p
                        className={`${
                          isDarkMode ? 'text-amber-200' : 'text-amber-900'
                        }`}
                      >
                        {location.lightPollution}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
