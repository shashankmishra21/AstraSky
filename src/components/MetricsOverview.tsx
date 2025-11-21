import { motion } from 'motion/react';
import { locations } from '../data/locations';

interface MetricsOverviewProps {
  isDarkMode: boolean;
}

export function MetricsOverview({ isDarkMode }: MetricsOverviewProps) {
  const avgStarVisibility = Math.round(
    locations.reduce((sum, loc) => sum + loc.starVisibility, 0) / locations.length
  );
  const avgCloudCover = Math.round(
    locations.reduce((sum, loc) => sum + loc.cloudCover, 0) / locations.length
  );
  const avgLightPollution = Math.round(
    locations.reduce((sum, loc) => sum + loc.lightPollution, 0) / locations.length
  );
  const bestLocations = locations.filter(loc => loc.starVisibility >= 90).length;

  const metrics = [
    {
      label: 'Star Visibility Index',
      sublabel: 'Average across sites',
      value: avgStarVisibility,
      unit: '%',
      gradient: isDarkMode 
        ? 'from-blue-500 via-cyan-500 to-teal-500' 
        : 'from-blue-600 via-cyan-600 to-teal-600',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      change: '+5.2%',
      symbol: '★',
    },
    {
      label: 'Cloud Coverage',
      sublabel: 'Current conditions',
      value: avgCloudCover,
      unit: '%',
      gradient: isDarkMode 
        ? 'from-slate-400 via-slate-500 to-slate-600' 
        : 'from-slate-600 via-slate-700 to-slate-800',
      bgGradient: 'from-slate-500/10 to-slate-600/10',
      change: '-3.8%',
      symbol: '◐',
    },
    {
      label: 'Light Pollution',
      sublabel: 'Environmental factor',
      value: avgLightPollution,
      unit: '%',
      gradient: isDarkMode 
        ? 'from-amber-400 via-orange-500 to-red-500' 
        : 'from-amber-600 via-orange-600 to-red-600',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      change: '-8.1%',
      symbol: '◉',
    },
    {
      label: 'Prime Locations',
      sublabel: 'Optimal viewing sites',
      value: bestLocations,
      unit: '',
      gradient: isDarkMode 
        ? 'from-emerald-400 via-green-500 to-teal-500' 
        : 'from-emerald-600 via-green-600 to-teal-600',
      bgGradient: 'from-emerald-500/10 to-green-500/10',
      change: '+2',
      symbol: '◆',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: { type: 'spring', stiffness: 400 },
          }}
          className="relative group"
          style={{ perspective: 1000 }}
        >
          <div
            className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
              isDarkMode
                ? 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-900/60 hover:border-slate-600/60'
                : 'bg-white/70 border-slate-200/60 hover:bg-white/90 hover:border-slate-300/80'
            }`}
            style={{
              boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient}`}
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.5,
              }}
            />

            {/* Orbital ring decoration */}
            <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  isDarkMode ? 'border-slate-400' : 'border-slate-600'
                }`}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
              <motion.div
                className={`absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-r ${metric.gradient}`}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            <div className="relative z-10 p-6">
              {/* Custom symbol and change indicator */}
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  className={`text-5xl bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {metric.symbol}
                </motion.div>
                
                <motion.div
                  className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  }`}
                  initial={{ opacity: 0, scale: 0, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {metric.change}
                </motion.div>
              </div>

              {/* Label */}
              <div className="mb-4">
                <h3
                  className={`text-sm mb-1 tracking-wide ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {metric.label}
                </h3>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-500'
                  }`}
                >
                  {metric.sublabel}
                </p>
              </div>

              {/* Value with animated counter */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  className={`text-5xl bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    type: 'spring',
                    stiffness: 150,
                  }}
                >
                  {metric.value}
                </motion.span>
                <span
                  className={`text-2xl ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-600'
                  }`}
                >
                  {metric.unit}
                </span>
              </div>

              {/* Progress bar */}
              <div className={`mt-4 h-1.5 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}>
                <motion.div
                  className={`h-full bg-gradient-to-r ${metric.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.unit === '%' ? metric.value : (metric.value / 10) * 100}%` }}
                  transition={{
                    delay: index * 0.1 + 0.4,
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                  style={{
                    boxShadow: `0 0 10px ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
                  }}
                />
              </div>
            </div>

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
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

            {/* Corner accent */}
            <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${metric.gradient} opacity-5 rounded-tl-full`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
