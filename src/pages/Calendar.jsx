import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const EventCard = ({ title, date, time, location, type }) => {
  const getTypeStyles = () => {
    const styles = {
      family: 'from-rose-400 to-amber-400',
      kids: 'from-amber-400 to-orange-400',
      outdoor: 'from-teal-400 to-sky-400',
      indoor: 'from-sky-400 to-indigo-400',
    };
    return styles[type] || styles.family;
  };

  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${getTypeStyles()} opacity-80`} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <svg className="w-3 h-3 mr-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1 truncate">
            <svg className="w-3 h-3 mr-1 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');

  const events = [
    {
      title: 'Мастер-класс по гончарному делу',
      date: '15 мая 2024',
      time: '12:00 - 14:00',
      location: 'Творческая студия "Глина"',
      type: 'family'
    },
    {
      title: 'Поход в парк развлечений',
      date: '16 мая 2024',
      time: '11:00 - 18:00',
      location: 'Парк "Сказка"',
      type: 'kids'
    },
    {
      title: 'Велопрогулка',
      date: '17 мая 2024',
      time: '10:00 - 13:00',
      location: 'Городской парк',
      type: 'outdoor'
    },
    {
      title: 'Семейный киновечер',
      date: '18 мая 2024',
      time: '19:00 - 21:00',
      location: 'Дома',
      type: 'indoor'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100/60 to-amber-100/60 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-teal-100/60 to-sky-100/60 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100/80 text-gray-600 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-gray-800">Май 2024</span>
                  <button className="p-2 rounded-lg hover:bg-gray-100/80 text-gray-600 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="flex rounded-xl overflow-hidden border border-gray-200/80 bg-white/60 backdrop-blur-sm">
                    <button 
                      onClick={() => setView('month')}
                      className={`px-3 py-1.5 text-sm transition-colors ${view === 'month' ? 'bg-gray-100/80 font-medium text-gray-800' : 'text-gray-600 hover:bg-gray-50/80'}`}
                    >
                      Месяц
                    </button>
                    <button 
                      onClick={() => setView('week')}
                      className={`px-3 py-1.5 text-sm transition-colors ${view === 'week' ? 'bg-gray-100/80 font-medium text-gray-800' : 'text-gray-600 hover:bg-gray-50/80'}`}
                    >
                      Неделя
                    </button>
                    <button 
                      onClick={() => setView('day')}
                      className={`px-3 py-1.5 text-sm transition-colors ${view === 'day' ? 'bg-gray-100/80 font-medium text-gray-800' : 'text-gray-600 hover:bg-gray-50/80'}`}
                    >
                      День
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="grid grid-cols-7 border-b border-gray-200/80">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                  <div key={day} className="text-center py-2.5 text-sm font-medium text-gray-600 border-r border-gray-200/80 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 auto-rows-fr">
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNumber = ((i + 1) % 31) || 31;
                  const hasEvent = [15, 16, 17, 18].includes(dayNumber);
                  const isSelected = i === 14;
                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 0.98 }}
                      className={`relative p-1.5 border-r border-b border-gray-200/80 last:border-r-0 min-h-[80px] cursor-pointer
                        ${isSelected ? 'bg-rose-50/80' : 'hover:bg-gray-50/80'} 
                        transition-colors duration-200`}
                    >
                      <span className={`text-sm ${isSelected ? 'font-medium text-rose-600' : 'text-gray-700'}`}>
                        {dayNumber}
                      </span>
                      {hasEvent && (
                        <div className="absolute bottom-1.5 left-1.5 right-1.5">
                          <div className="h-1 rounded-full bg-gradient-to-r from-rose-400/80 to-amber-400/80 shadow-sm"></div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Предстоящие события</h2>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-shadow duration-200"
                >
                  Добавить
                </motion.button>
              </div>
              <div className="space-y-2.5">
                {events.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 