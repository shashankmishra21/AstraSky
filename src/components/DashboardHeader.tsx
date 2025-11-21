import { motion } from 'motion/react';

interface DashboardHeaderProps {
  isDarkMode: boolean;
}

export function DashboardHeader({ isDarkMode }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center mb-10 md:mb-16 relative w-full px-2 sm:px-6 overflow-x-clip"
    >
      {/* Constellation Pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden w-full h-28 md:h-32 lg:h-40">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 150" preserveAspectRatio="none">
            {/* Animated constellation lines */}
            <motion.line
              x1="100" y1="75" x2="200" y2="50"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
            />
            <motion.line
              x1="200" y1="50" x2="280" y2="80"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.2 }}
            />
            <motion.line
              x1="520" y1="80" x2="600" y2="50"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            />
            <motion.line
              x1="600" y1="50" x2="700" y2="75"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1.2 }}
            />
          </svg>
          {/* Constellation stars with twinkling animation */}
          {[100, 200, 280, 520, 600, 700].map((x, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-slate-300' : 'bg-slate-600'}`}
              style={{
                left: `${(x / 800) * 100}%`,
                top: i % 2 === 0 ? '53%' : '33%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.6, 1, 1.3, 1],
                opacity: [0, 1, 0.6, 1, 0.8]
              }}
              transition={{
                delay: 0.7 + i * 0.12,
                duration: 1.9,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Title and orbital icon */}
      <div className="relative inline-block mb-2 md:mb-6 w-full">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Orbit circle */}
          <motion.div
            className="relative w-10 h-10 md:w-16 md:h-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className={`absolute inset-0 rounded-full border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-400'} opacity-40`} />
            <motion.div
              className={`absolute top-0 left-1/2 w-2 h-2 md:w-3 md:h-3 -ml-1 -mt-1 md:-ml-1.5 md:-mt-1.5 rounded-full ${isDarkMode ? 'bg-gradient-to-br from-blue-400 to-cyan-500' : 'bg-gradient-to-br from-blue-600 to-cyan-700'}`}
              style={{
                boxShadow: isDarkMode ? '0 0 14px rgba(34, 211, 238, 0.6)' : '0 0 10px rgba(34, 211, 238, 0.4)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.6
              }}
            />
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.1, type: 'spring', stiffness: 210 }}
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-serif break-words ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}
          >
            AstraSky
          </motion.h1>

          {/* Crescent moon, gently rocking */}
          <motion.div
            className="relative w-10 h-10 md:w-16 md:h-16"
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gradient-to-br from-yellow-200 to-yellow-400' : 'bg-gradient-to-br from-yellow-400 to-yellow-600'}`}
            style={{
              boxShadow: isDarkMode ? '0 0 16px rgba(250, 204, 21, 0.4)' : '0 0 10px rgba(250, 204, 21, 0.3)',
            }}
            />
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
            style={{
              clipPath: 'ellipse(55% 60% at 60% 50%)',
            }}
            />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, type: 'spring', stiffness: 210 }}
          className={`text-lg sm:text-xl md:text-2xl mt-2 md:mt-4 tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} max-w-md mx-auto`}
        >
          Real-Time Astronomy Dashboard
        </motion.p>
      </div>

      {/* Location & Sites badge, bounces in */}
      <motion.div
        className={`inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-xl ${isDarkMode ? 'bg-slate-800/40 border border-slate-700/50' : 'bg-white/60 border border-slate-300/50'} mt-4`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.0, type: 'spring', bounce: 0.35, duration: 0.8 }}
      >
        {/* Animated location marker pulses */}
        <div className="relative">
          <motion.div
            className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <motion.div
            className={`absolute inset-0 w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`}
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>
        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} text-sm sm:text-base`}>
          Chhattisgarh, India
        </span>
        <div className={`w-px h-4 mx-2 ${isDarkMode ? 'bg-slate-600' : 'bg-slate-400'} hidden sm:block`} />
        <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base`}>
          8 Observation Sites
        </span>
      </motion.div>

      {/* Ambient glows breathe */}
      <motion.div
        className="absolute top-0 left-1/4 w-40 h-40 md:w-64 md:h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.11, 0.16, 0.09],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-40 h-40 md:w-64 md:h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.11, 0.17, 0.10],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </motion.div>
  );
}
