import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] mb-4">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const AIFeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-rose-100 to-amber-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] mb-4">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100 to-amber-100 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-teal-100 to-sky-100 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Семейный досуг будущего с{' '}
            <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              искусственным интеллектом
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Откройте новые возможности для семейного отдыха с помощью искусственного интеллекта. 
            Персонализированные рекомендации, умное планирование и незабываемые моменты вместе.
          </p>
          <Link 
            to="/chat"
            className="inline-block px-8 py-4 bg-gradient-to-r from-rose-400 to-amber-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Начать планирование
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <FeatureCard
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="AI Ассистент"
            description="Персональный помощник, который анализирует интересы вашей семьи и предлагает идеальные варианты досуга"
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            title="Умный подбор"
            description="AI учитывает возраст детей, интересы всех членов семьи, погоду и даже транспортную доступность"
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            title="Календарь мероприятий"
            description="Удобное планирование и отслеживание всех семейных событий в одном месте"
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-400">1</span>
              </div>
              <h3 className="font-semibold mb-2">Создайте профиль</h3>
              <p className="text-gray-600">Укажите состав семьи и интересы каждого члена</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-400">2</span>
              </div>
              <h3 className="font-semibold mb-2">Общайтесь с AI</h3>
              <p className="text-gray-600">Расскажите о своих пожеланиях ассистенту</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-400">3</span>
              </div>
              <h3 className="font-semibold mb-2">Получите план</h3>
              <p className="text-gray-600">AI предложит оптимальные варианты досуга</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-400">4</span>
              </div>
              <h3 className="font-semibold mb-2">Наслаждайтесь</h3>
              <p className="text-gray-600">Проводите время вместе и создавайте воспоминания</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Преимущества AI в планировании досуга
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Искусственный интеллект анализирует множество факторов, чтобы предложить идеальные варианты для вашей семьи
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Персонализация"
              description="AI учится на ваших предпочтениях и создает все более точные рекомендации с каждым использованием"
            />
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Быстрый анализ"
              description="Мгновенная обработка данных о погоде, пробках, расписаниях и других важных факторах"
            />
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Бюджетные опции"
              description="Интеллектуальный подбор развлечений с учетом вашего бюджета и текущих акций"
            />
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Экономия времени"
              description="Больше не нужно тратить часы на поиск и сравнение вариантов - AI сделает это за вас"
            />
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Безопасность"
              description="Все рекомендации проверяются на безопасность и соответствие возрастным ограничениям"
            />
            <AIFeatureCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Учет интересов"
              description="AI находит компромиссы и активности, которые будут интересны всем членам семьи"
            />
          </div>
        </motion.section>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Home; 