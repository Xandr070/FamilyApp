import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100 to-amber-100 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-teal-100 to-sky-100 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate-slow">
          <div className="w-[800px] h-[800px] border-2 border-dashed border-rose-200/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-dashed border-sky-200/30 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-dashed border-teal-200/30 rounded-full animate-rotate-slow"></div>
        </div>

        <div className="absolute top-20 left-[20%] animate-float" style={{ animationDelay: '-2s' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-32 right-[25%] animate-float" style={{ animationDelay: '-4s' }}>
          <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full opacity-20"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.1)] p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-block mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] animate-pulse-slow">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12 20V10" 
                      stroke="url(#grad1)" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />

                    <path 
                      d="M12 10L7 6M12 10L17 6" 
                      stroke="url(#grad1)" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient id="grad1" x1="2" y1="2" x2="22" y2="22">
                        <stop offset="0%" stopColor="#F43F5E"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Добро пожаловать в семью' : 'Присоединиться к семье'}
            </h2>
            <p className="text-gray-500">
              Создавайте будущее вашей семьи вместе с AI
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-400 to-amber-400 text-white rounded-lg font-medium transition-all duration-200 transform hover:shadow-lg hover:from-rose-500 hover:to-amber-500"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </motion.button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 hover:text-rose-500 transition-colors duration-200"
            >
              {isLogin ? 'Создать семейный аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth; 