import { motion } from 'motion/react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { getLocationById, calculateOverallScore } from '../data/locations';

interface ComparisonViewProps {
  isDarkMode: boolean;
  locationIds: string[];
  onClose: () => void;
}

export function ComparisonView({
  isDarkMode,
  locationIds,
  onClose,
}: ComparisonViewProps) {
  const locations = locationIds.map(id => getLocationById(id)).filter(Boolean);

  if (locations.length !== 2) return null;

  const [location1, location2] = locations;

  // Prepare radar chart data
  const radarData = [
    {
      metric: 'Star Visibility',
      [location1.name]: location1.starVisibility,
      [location2.name]: location2.starVisibility,
    },
    {
      metric: 'Clear Skies',
      [location1.name]: 100 - location1.cloudCover,
      [location2.name]: 100 - location2.cloudCover,
    },
    {
      metric: 'Low Pollution',
      [location1.name]: 100 - location1.lightPollution,
      [location2.name]: 100 - location2.lightPollution,
    },
    {
      metric: 'Altitude',
      [location1.name]: (location1.altitude / 1500) * 100,
      [location2.name]: (location2.altitude / 1500) * 100,
    },
    {
      metric: 'Accessibility',
      [location1.name]:
        location1.accessibility === 'Easy' ? 100 : location1.accessibility === 'Moderate' ? 60 : 30,
      [location2.name]:
        location2.accessibility === 'Easy' ? 100 : location2.accessibility === 'Moderate' ? 60 : 30,
    },
  ];

  const compareMetric = (val1: number, val2: number) => {
    const diff = Math.abs(val1 - val2);
    if (diff < 5) return 'equal';
    return val1 > val2 ? 'better1' : 'better2';
  };

  const ComparisonIcon = ({ comparison }: { comparison: string }) => {
    if (comparison === 'equal')
      return <Minus className="w-4 h-4 text-yellow-500" />;
    if (comparison === 'better1')
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const score1 = calculateOverallScore(location1);
  const score2 = calculateOverallScore(location2);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={`relative rounded-3xl backdrop-blur-xl border p-8 overflow-hidden ${
          isDarkMode
            ? 'bg-white/5 border-white/10'
            : 'bg-white/50 border-slate-200'
        }`}
      >
        {/* Animated background orbs */}
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full backdrop-blur-md transition-colors ${
            isDarkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'
          }`}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="relative">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              className={`text-3xl mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Location Comparison
            </h2>
            <p
              className={`${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Detailed metrics comparison between selected locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Location 1 Card */}
            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? 'bg-purple-500/10 border-purple-500/30'
                  : 'bg-purple-100 border-purple-300'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className={`text-xl mb-1 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {location1.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-700'
                    }`}
                  >
                    {location1.district}
                  </p>
                </div>
                <motion.div
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {score1}
                </motion.div>
              </div>

              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {location1.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Star Visibility
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location1.starVisibility}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Cloud Cover
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location1.cloudCover}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Light Pollution
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location1.lightPollution}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Altitude
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location1.altitude}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Accessibility
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location1.accessibility}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Location 2 Card */}
            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-blue-100 border-blue-300'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className={`text-xl mb-1 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {location2.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}
                  >
                    {location2.district}
                  </p>
                </div>
                <motion.div
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {score2}
                </motion.div>
              </div>

              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {location2.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Star Visibility
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location2.starVisibility}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Cloud Cover
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location2.cloudCover}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Light Pollution
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location2.lightPollution}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Altitude
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location2.altitude}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Accessibility
                  </span>
                  <span
                    className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  >
                    {location2.accessibility}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Comparison Chart */}
          <motion.div
            className={`p-6 rounded-2xl backdrop-blur-sm border mb-6 ${
              isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/50 border-slate-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3
              className={`text-xl mb-6 text-center ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Radar Comparison
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#475569', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#475569' }}
                />
                <Radar
                  name={location1.name}
                  dataKey={location1.name}
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name={location2.name}
                  dataKey={location2.name}
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                    color: isDarkMode ? '#fff' : '#000',
                  }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                  labelStyle={{
                    color: isDarkMode ? '#fff' : '#000',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Comparison */}
          <motion.div
            className={`p-6 rounded-2xl backdrop-blur-sm border ${
              isDarkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white/50 border-slate-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3
              className={`text-xl mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Quick Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-white/5' : 'bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Star Visibility
                  </span>
                  <ComparisonIcon
                    comparison={compareMetric(
                      location1.starVisibility,
                      location2.starVisibility
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    {location1.starVisibility}%
                  </span>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {location2.starVisibility}%
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-white/5' : 'bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Cloud Cover (Lower is Better)
                  </span>
                  <ComparisonIcon
                    comparison={compareMetric(
                      location2.cloudCover,
                      location1.cloudCover
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    {location1.cloudCover}%
                  </span>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {location2.cloudCover}%
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-white/5' : 'bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Light Pollution (Lower is Better)
                  </span>
                  <ComparisonIcon
                    comparison={compareMetric(
                      location2.lightPollution,
                      location1.lightPollution
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    {location1.lightPollution}%
                  </span>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {location2.lightPollution}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
