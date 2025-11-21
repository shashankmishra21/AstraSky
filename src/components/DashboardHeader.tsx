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
      className="text-center mb-16 relative"
    >
      {/* Custom Constellation Pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="relative w-full h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 150">
            <motion.line
              x1="100" y1="75" x2="200" y2="50"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
            <motion.line
              x1="200" y1="50" x2="280" y2="80"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            />
            <motion.line
              x1="520" y1="80" x2="600" y2="50"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
            <motion.line
              x1="600" y1="50" x2="700" y2="75"
              stroke={isDarkMode ? '#cbd5e1' : '#64748b'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            />
          </svg>
          
          {/* Constellation stars */}
          {[100, 200, 280, 520, 600, 700].map((x, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isDarkMode ? 'bg-slate-300' : 'bg-slate-600'
              }`}
              style={{
                left: `${(x / 800) * 100}%`,
                top: i % 2 === 0 ? '50%' : '33%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 0.6,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Title with custom orbital element */}
      <div className="relative inline-block mb-6">
        <motion.div
          className="flex items-center justify-center gap-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Custom orbit circle */}
          <motion.div
            className="relative w-16 h-16"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className={`absolute inset-0 rounded-full border-2 ${
              isDarkMode ? 'border-slate-600' : 'border-slate-400'
            } opacity-40`} />
            <motion.div
              className={`absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-400 to-cyan-500' 
                  : 'bg-gradient-to-br from-blue-600 to-cyan-700'
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? '0 0 20px rgba(34, 211, 238, 0.6)' 
                  : '0 0 15px rgba(34, 211, 238, 0.4)',
              }}
            />
          </motion.div>
          
          <h1 className={`text-7xl md:text-8xl tracking-tight ${
            isDarkMode
              ? 'text-slate-100'
              : 'text-slate-900'
          }`}>
            AstraSky
          </h1>
          
          {/* Custom crescent moon shape */}
          <motion.div
            className="relative w-16 h-16"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className={`absolute inset-0 rounded-full ${
              isDarkMode 
                ? 'bg-gradient-to-br from-yellow-200 to-yellow-400' 
                : 'bg-gradient-to-br from-yellow-400 to-yellow-600'
            }`}
            style={{
              boxShadow: isDarkMode 
                ? '0 0 30px rgba(250, 204, 21, 0.4)' 
                : '0 0 20px rgba(250, 204, 21, 0.3)',
            }}
            />
            <div className={`absolute inset-0 rounded-full ${
              isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
            }`}
            style={{
              clipPath: 'ellipse(55% 60% at 60% 50%)',
            }}
            />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-xl md:text-2xl mt-4 tracking-wide ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Real-Time Astronomy Dashboard
        </motion.p>
      </div>

      {/* Location Badge */}
      <motion.div
        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl ${
          isDarkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/60 border border-slate-300/50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Custom location marker */}
        <div className="relative">
          <motion.div
            className={`w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
            }`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`absolute inset-0 w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
            }`}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        <span className={`${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Chhattisgarh, India
        </span>
        
        <div className={`w-px h-4 ${
          isDarkMode ? 'bg-slate-600' : 'bg-slate-400'
        }`} />
        
        <span className={`${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          8 Observation Sites
        </span>
      </motion.div>

      {/* Ambient glow effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </motion.div>
  );
}
