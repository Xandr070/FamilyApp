import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';

const EventCard = ({ event, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyle = () => {
    const styles = {
      upcoming: 'bg-green-50 text-green-600 border-green-100',
      completed: 'bg-gray-50 text-gray-600 border-gray-100',
      cancelled: 'bg-red-50 text-red-600 border-red-100',
    };
    return styles[event.status] || styles.upcoming;
  };

  const getTypeIcon = () => {
    switch (event.type) {
      case 'outdoor':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'indoor':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      layout
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isExpanded ? 'row-span-2' : ''}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${getStatusStyle()} flex items-center justify-center`}>
              {getTypeIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusStyle()}`}>
              {event.status === 'upcoming' ? 'Предстоит' : event.status === 'completed' ? 'Завершено' : 'Отменено'}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-lg bg-gray-50 text-xs text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              {event.status === 'upcoming' && (
                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={() => onAction(event.id, 'cancel')}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Отменить
                  </button>
                  <button
                    onClick={() => onAction(event.id, 'edit')}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    Редактировать
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
        >
          {isExpanded ? 'Свернуть' : 'Подробнее'}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const FilterButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-lg shadow-rose-200/50'
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const Events = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');

  const events = [
    {
      id: 1,
      title: 'Мастер-класс по гончарному делу',
      date: '15 мая 2024',
      time: '15:00 - 17:00',
      location: 'Творческая студия "Глина"',
      type: 'indoor',
      status: 'upcoming',
      description: 'Увлекательный мастер-класс для всей семьи, где каждый сможет создать свое уникальное керамическое изделие под руководством опытного мастера.',
      tags: ['творчество', 'керамика', 'для всей семьи']
    },
    {
      id: 2,
      title: 'Поход в веревочный парк',
      date: '10 мая 2024',
      time: '11:00 - 14:00',
      location: 'Парк приключений "Высота"',
      type: 'outdoor',
      status: 'completed',
      description: 'Активный отдых на свежем воздухе с прохождением различных препятствий на высоте. Несколько уровней сложности для детей и взрослых.',
      tags: ['активный отдых', 'спорт', 'природа']
    },
    {
      id: 3,
      title: 'Научное шоу для детей',
      date: '20 мая 2024',
      time: '12:00 - 13:30',
      location: 'Детский центр "Эврика"',
      type: 'education',
      status: 'upcoming',
      description: 'Увлекательные научные эксперименты, которые помогут детям понять основы физики и химии в игровой форме.',
      tags: ['наука', 'образование', 'для детей']
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEventAction = (eventId, action) => {
    console.log(`Event ${eventId} action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100/60 to-amber-100/60 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-sky-100/60 to-indigo-100/60 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Мероприятия</h1>
              <p className="text-gray-600 mt-1">Управляйте своими семейными событиями</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-shadow duration-200"
            >
              Создать мероприятие
            </motion.button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                  Все
                </FilterButton>
                <FilterButton active={filter === 'upcoming'} onClick={() => setFilter('upcoming')}>
                  Предстоящие
                </FilterButton>
                <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>
                  Завершенные
                </FilterButton>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск мероприятий..."
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400/20 focus:border-rose-400 transition-all duration-200"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex items-center rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-1.5 rounded-lg ${view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-1.5 rounded-lg ${view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <AnimatePresence>
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onAction={handleEventAction}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Мероприятия не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска или создайте новое мероприятие</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events; 