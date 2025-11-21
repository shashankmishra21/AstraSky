import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Star, Cloud, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  icon: any;
}

interface NotificationSystemProps {
  isDarkMode: boolean;
}

export function NotificationSystem({ isDarkMode }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Simulate notifications appearing
    const notificationQueue: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Perfect Viewing Tonight!',
        message: 'Mainpat Hill Station has excellent conditions',
        icon: Star,
      },
      {
        id: '2',
        type: 'warning',
        title: 'Weather Alert',
        message: 'Cloud cover increasing in Barnawapara area',
        icon: Cloud,
      },
      {
        id: '3',
        type: 'info',
        title: 'Meteor Shower Alert',
        message: 'Peak viewing expected tonight at Achanakmar',
        icon: AlertTriangle,
      },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < notificationQueue.length) {
        setNotifications(prev => [...prev, notificationQueue[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n && n.id !== id));
  };

  const unreadCount = notifications.filter(n => n).length;

  return (
    <>
      {/* Notification Bell */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className={`fixed top-6 right-24 z-50 p-4 rounded-full backdrop-blur-xl border transition-all duration-300 ${
          isDarkMode
            ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
            : 'bg-slate-900/10 border-slate-900/20 hover:bg-slate-900/20 text-slate-900'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-24 right-6 z-50 w-96 max-h-[500px] overflow-y-auto rounded-2xl backdrop-blur-xl border p-4 ${
              isDarkMode
                ? 'bg-slate-900/90 border-white/20'
                : 'bg-white/90 border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Notifications
              </h3>
              <button
                onClick={() => setShowPanel(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-white/10'
                    : 'hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p
                  className={`text-center py-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  No new notifications
                </p>
              ) : (
                notifications.filter(n => n).map((notification, index) => {
                  if (!notification) return null;
                  
                  const NotificationIcon = notification.icon;
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-xl border ${
                        notification.type === 'success'
                          ? isDarkMode
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-green-100 border-green-300'
                          : notification.type === 'warning'
                          ? isDarkMode
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-yellow-100 border-yellow-300'
                          : isDarkMode
                          ? 'bg-blue-500/10 border-blue-500/30'
                          : 'bg-blue-100 border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.type === 'success'
                              ? 'bg-green-500'
                              : notification.type === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                        >
                          <NotificationIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`text-sm mb-1 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {notification.message}
                          </p>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className={`p-1 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'hover:bg-white/10'
                              : 'hover:bg-slate-200'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
