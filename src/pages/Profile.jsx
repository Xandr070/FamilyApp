import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';

const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const FamilyMemberCard = ({ member, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAgeString = (birthDate) => {
    const years = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return `${years} ${years % 10 === 1 && years !== 11 ? 'год' : years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20) ? 'года' : 'лет'}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-amber-400 transform origin-left scale-x-0 transition-transform duration-300"
        style={{ transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' }}
      />
      
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 flex items-center justify-center text-white text-2xl font-semibold">
              {member.name[0]}
            </div>
            {member.role === 'parent' && (
              <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full p-1">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>{member.role === 'parent' ? 'Родитель' : 'Ребенок'}</span>
              <span>•</span>
              <span>{getAgeString(member.birthDate)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {member.interests && (
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-lg bg-gray-50 text-xs text-gray-600"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center space-x-2"
            >
              <button
                onClick={() => onEdit(member)}
                className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Редактировать
              </button>
              <button
                onClick={() => onDelete(member.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Удалить
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
  >
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </motion.div>
);

const Profile = () => {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Александр',
      role: 'parent',
      birthDate: '1985-05-15',
      interests: ['Спорт', 'Путешествия', 'Фотография']
    },
    {
      id: 2,
      name: 'Мария',
      role: 'parent',
      birthDate: '1987-08-23',
      interests: ['Кулинария', 'Йога', 'Искусство']
    },
    {
      id: 3,
      name: 'Дмитрий',
      role: 'child',
      birthDate: '2015-03-10',
      interests: ['Конструкторы', 'Динозавры', 'Рисование']
    },
    {
      id: 4,
      name: 'София',
      role: 'child',
      birthDate: '2018-11-05',
      interests: ['Танцы', 'Куклы', 'Мультфильмы']
    }
  ]);

  const stats = [
    {
      title: 'Посещено мероприятий',
      value: '24',
      color: 'bg-gradient-to-r from-rose-400 to-amber-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Запланировано',
      value: '8',
      color: 'bg-gradient-to-r from-sky-400 to-indigo-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Любимых мест',
      value: '12',
      color: 'bg-gradient-to-r from-emerald-400 to-cyan-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Достижений',
      value: '15',
      color: 'bg-gradient-to-r from-violet-400 to-purple-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  const handleEditMember = (member) => {
    console.log('Edit member:', member);
  };

  const handleDeleteMember = (memberId) => {
    console.log('Delete member:', memberId);
  };

  const handleAddMember = () => {
    console.log('Add new family member');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100/60 to-amber-100/60 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-sky-100/60 to-indigo-100/60 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
        <ProfileSection title="Профиль">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 flex items-center justify-center text-white text-4xl font-semibold">
              А
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Александр Иванов</h1>
              <p className="text-gray-600 mt-1">alexander@example.com</p>
              <div className="flex items-center space-x-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-shadow duration-200"
                >
                  Редактировать профиль
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  Настройки
                </motion.button>
              </div>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Статистика">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Члены семьи">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">Управляйте составом вашей семьи и настройками каждого участника</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddMember}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-shadow duration-200"
            >
              Добавить члена семьи
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {familyMembers.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))}
            </AnimatePresence>
          </div>
        </ProfileSection>

        <ProfileSection title="Предпочтения">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Любимые активности</h3>
              <div className="flex flex-wrap gap-2">
                {['Парки', 'Музеи', 'Мастер-классы', 'Спорт', 'Театр', 'Кино', 'Рестораны'].map((activity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Особые предпочтения</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="notifications" className="rounded text-rose-400 focus:ring-rose-400" />
                  <label htmlFor="notifications" className="ml-2 text-gray-600">Получать уведомления о новых мероприятиях</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="recommendations" className="rounded text-rose-400 focus:ring-rose-400" />
                  <label htmlFor="recommendations" className="ml-2 text-gray-600">Персонализированные рекомендации</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="newsletter" className="rounded text-rose-400 focus:ring-rose-400" />
                  <label htmlFor="newsletter" className="ml-2 text-gray-600">Подписка на новости и обновления</label>
                </div>
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile; 