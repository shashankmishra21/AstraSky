import { motion } from 'motion/react';
import { MapPin, Star } from 'lucide-react';
import { locations, calculateOverallScore } from '../data/locations';

interface LocationMapProps {
  isDarkMode: boolean;
  selectedLocations: string[];
  onLocationSelect: (locationId: string) => void;
}

export function LocationMap({
  isDarkMode,
  selectedLocations,
  onLocationSelect,
}: LocationMapProps) {
  // Normalize coordinates to fit within the map view
  const minLat = Math.min(...locations.map(l => l.coordinates.lat));
  const maxLat = Math.max(...locations.map(l => l.coordinates.lat));
  const minLng = Math.min(...locations.map(l => l.coordinates.lng));
  const maxLng = Math.max(...locations.map(l => l.coordinates.lng));

  const normalizePosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10;
    return { x, y };
  };

  return (
    <motion.div
      className={`relative rounded-3xl backdrop-blur-xl border p-6 overflow-hidden ${
        isDarkMode
          ? 'bg-white/5 border-white/10'
          : 'bg-white/50 border-slate-200'
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500`}>
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2
              className={`text-xl ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Interactive Location Map
            </h2>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Click markers to compare locations
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
        {/* Map Background */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900'
              : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
          }`}
        >
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Animated region outline (Chhattisgarh shape approximation) */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M 15,30 Q 20,20 30,15 L 50,15 Q 65,18 75,25 L 85,40 Q 88,55 85,70 L 75,85 Q 60,88 45,87 L 30,85 Q 18,75 15,60 Z"
              fill="none"
              stroke={isDarkMode ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.5)'}
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Animated connection lines between nearby locations */}
          <svg className="absolute inset-0 w-full h-full">
            {locations.map((loc1, i) =>
              locations.slice(i + 1).map((loc2, j) => {
                const pos1 = normalizePosition(
                  loc1.coordinates.lat,
                  loc1.coordinates.lng
                );
                const pos2 = normalizePosition(
                  loc2.coordinates.lat,
                  loc2.coordinates.lng
                );
                const distance = Math.sqrt(
                  Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
                );

                if (distance < 25) {
                  return (
                    <motion.line
                      key={`${loc1.id}-${loc2.id}`}
                      x1={`${pos1.x}%`}
                      y1={`${pos1.y}%`}
                      x2={`${pos2.x}%`}
                      y2={`${pos2.y}%`}
                      stroke={isDarkMode ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.3)'}
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Location Markers */}
          {locations.map((location, index) => {
            const position = normalizePosition(
              location.coordinates.lat,
              location.coordinates.lng
            );
            const score = calculateOverallScore(location);
            const isSelected = selectedLocations.includes(location.id);

            return (
              <motion.div
                key={location.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.3, z: 50 }}
                onClick={() => onLocationSelect(location.id)}
              >
                {/* Pulsing ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    isSelected
                      ? 'bg-yellow-500/30'
                      : score >= 80
                      ? 'bg-green-500/30'
                      : score >= 70
                      ? 'bg-blue-500/30'
                      : 'bg-orange-500/30'
                  }`}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                  style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20 }}
                />

                {/* Marker */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-yellow-500 border-yellow-300 shadow-lg shadow-yellow-500/50'
                      : score >= 80
                      ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50'
                      : score >= 70
                      ? 'bg-blue-500 border-blue-300 shadow-lg shadow-blue-500/50'
                      : 'bg-orange-500 border-orange-300 shadow-lg shadow-orange-500/50'
                  }`}
                >
                  <Star className="w-5 h-5 text-white" fill="white" />
                </div>

                {/* Tooltip */}
                <motion.div
                  className={`absolute top-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg backdrop-blur-xl border whitespace-nowrap pointer-events-none ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-white/20 text-white'
                      : 'bg-white/90 border-slate-300 text-slate-900'
                  }`}
                  initial={{ opacity: 0, y: -5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <p className="text-xs">{location.name}</p>
                  <p className="text-xs opacity-70">Score: {score}/100</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          className={`absolute bottom-4 left-4 px-4 py-3 rounded-xl backdrop-blur-xl border ${
            isDarkMode
              ? 'bg-slate-900/80 border-white/20'
              : 'bg-white/80 border-slate-300'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <p
            className={`text-xs mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Location Quality
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span
                className={`text-xs ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Excellent (80+)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span
                className={`text-xs ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Good (70-79)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span
                className={`text-xs ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Fair (&lt; 70)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}