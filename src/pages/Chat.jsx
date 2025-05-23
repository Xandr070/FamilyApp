import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';

const ActionButton = ({ onClick, children, variant = 'primary' }) => {
  const baseStyle = "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200";
  const variants = {
    primary: "bg-gradient-to-r from-rose-400 to-amber-400 text-white hover:shadow-lg hover:shadow-rose-200/50",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </motion.button>
  );
};

const SuggestedActivity = ({ activity, onAccept, onDecline, onAddToCalendar }) => (
  <div className="bg-gray-50/50 rounded-xl p-3 mb-2">
    <h4 className="font-medium text-gray-800 mb-1">{activity.title}</h4>
    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
    <div className="flex items-center space-x-2 text-sm">
      {activity.time && (
        <span className="text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {activity.time}
        </span>
      )}
      {activity.location && (
        <span className="text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {activity.location}
        </span>
      )}
    </div>
    <div className="flex items-center space-x-2 mt-3">
      <ActionButton onClick={onAccept} variant="primary">Отлично!</ActionButton>
      <ActionButton onClick={onAddToCalendar} variant="secondary">Добавить в календарь</ActionButton>
      <ActionButton onClick={onDecline} variant="danger">Не подходит</ActionButton>
    </div>
  </div>
);

const MessageBubble = ({ message, isAi, onActivityAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex items-start max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
          ${isAi ? 'bg-gradient-to-r from-rose-400 to-amber-400' : 'bg-gradient-to-r from-sky-400 to-indigo-400'}`}
        >
          {isAi ? (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div className={`mx-2 px-4 py-2 rounded-2xl ${
          isAi 
            ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
            : 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white shadow-lg'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.thinking && (
            <div className="flex space-x-1 mt-2 h-4">
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          )}
          {message.activities && (
            <div className="mt-3">
              {message.activities.map((activity, index) => (
                <SuggestedActivity
                  key={index}
                  activity={activity}
                  onAccept={() => onActivityAction(activity, 'accept')}
                  onDecline={() => onActivityAction(activity, 'decline')}
                  onAddToCalendar={() => onActivityAction(activity, 'calendar')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SuggestedPrompt = ({ prompt, icon, description, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(prompt)}
    className="relative group p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 text-left hover:shadow-md hover:bg-white transition-all duration-200 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-100/20 to-amber-100/20 rounded-full blur-xl transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300" />
    
    <div className="relative flex items-start space-x-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800 mb-1">{prompt}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>

    <div className="relative mt-3 flex items-center text-xs text-rose-500 font-medium">
      <span>Спросить</span>
      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14m-7-7l7 7-7 7" />
      </svg>
    </div>
  </motion.button>
);

const ChatSidebar = ({ chats, activeChatId, onChatSelect, onChatDelete, onNewChat, onChatRename }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleRename = (chatId, newName) => {
    onChatRename(chatId, newName);
    setIsEditing(null);
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 transition-all duration-300 
      ${isOpen ? 'w-72' : 'w-16'} flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className={`font-medium text-gray-800 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          История чатов
        </h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-2 space-y-1"
            >
              {chats.map(chat => (
                <motion.div
                  key={chat.id}
                  layout
                  className={`relative group rounded-xl p-3 cursor-pointer transition-all
                    ${chat.id === activeChatId ? 'bg-rose-50 text-rose-600' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => onChatSelect(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    {isEditing === chat.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleRename(chat.id, editValue)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename(chat.id, editValue)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-rose-400"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span className="text-sm font-medium truncate flex-1">{chat.name}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(chat.id);
                              setEditValue(chat.name);
                            }}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onChatDelete(chat.id);
                            }}
                            className="p-1 hover:bg-white rounded-lg transition-colors text-red-500"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {new Date(chat.lastMessage).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`p-4 border-t border-gray-100 ${!isOpen && 'flex justify-center'}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className={`w-full px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 
            text-white font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-all duration-200
            ${!isOpen && 'w-10 h-10 p-0 flex items-center justify-center'}`}
        >
          {isOpen ? (
            "Новый чат"
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  );
};

const Chat = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'Планирование выходных', lastMessage: Date.now() },
    { id: 2, name: 'Идеи для праздника', lastMessage: Date.now() - 86400000 },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatHistory, setChatHistory] = useState({
    1: [
      { id: 1, content: "Привет! Я ваш AI-ассистент по планированию семейного досуга. Чем могу помочь?", isAi: true }
    ],
    2: [
      { id: 1, content: "Привет! Давайте спланируем ваш праздник.", isAi: true }
    ]
  });
  
  const [messages, setMessages] = useState(chatHistory[activeChatId] || []);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestedPrompts = [
    {
      prompt: "Спланировать выходные с детьми",
      description: "Получите персонализированные рекомендации для активного и познавательного досуга всей семьей, учитывающие возраст детей и ваши интересы.",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      prompt: "Организовать семейный праздник",
      description: "Создайте незабываемое событие с уникальным сценарием, играми, развлечениями и праздничным меню для всех возрастов.",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    },
    {
      prompt: "Найти занятия для дождливого дня",
      description: "Получите креативные идеи для увлекательного времяпрепровождения дома: от творческих мастер-классов до семейных игр и развивающих активностей.",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      prompt: "Спланировать семейное путешествие",
      description: "Разработаем маршрут с учетом интересов всех членов семьи, включая достопримечательности, активности и места для отдыха.",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    setMessages(chatHistory[activeChatId] || []);
    setShowSuggestions(true);
  }, [activeChatId]);

  useEffect(() => {
    setChatHistory(prev => ({
      ...prev,
      [activeChatId]: messages
    }));
  }, [messages, activeChatId]);

  const handleNewChat = () => {
    const newChatId = Math.max(...chats.map(c => c.id)) + 1;
    const newChat = {
      id: newChatId,
      name: 'Новый чат',
      lastMessage: Date.now()
    };
    setChats(prev => [...prev, newChat]);
    setChatHistory(prev => ({
      ...prev,
      [newChatId]: [
        { id: 1, content: "Привет! Я ваш AI-ассистент по планированию семейного досуга. Чем могу помочь?", isAi: true }
      ]
    }));
    setActiveChatId(newChatId);
  };

  const handleChatDelete = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    setChatHistory(prev => {
      const newHistory = { ...prev };
      delete newHistory[chatId];
      return newHistory;
    });
    if (activeChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id);
      }
    }
  };

  const handleChatRename = (chatId, newName) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, name: newName || 'Без названия' } : chat
    ));
  };

  const handleActivityAction = (activity, action) => {
    let response = "";
    switch (action) {
      case 'accept':
        response = `Отлично! Я рад, что вам понравилась идея "${activity.title}". Хотите добавить её в календарь?`;
        break;
      case 'decline':
        response = "Хорошо, давайте поищем что-то другое. Какие активности вам больше нравятся?";
        break;
      case 'calendar':
        response = `Событие "${activity.title}" добавлено в календарь на ${activity.time}. Я напомню вам о нём заранее!`;
        break;
    }
    
    setMessages(prev => [...prev, { id: Date.now(), content: response, isAi: true }]);
  };

  const generateAIResponse = (query) => {
    const responses = {
      "Предложи идеи для выходных с детьми": {
        content: "У меня есть несколько отличных идей для выходных с детьми:",
        activities: [
          {
            title: "Мастер-класс по гончарному делу",
            description: "Творческое занятие, где дети смогут создать свои собственные керамические изделия под руководством опытного мастера.",
            time: "Суббота, 15:00 - 17:00",
            location: "Творческая студия 'Глина'"
          },
          {
            title: "Семейный поход в веревочный парк",
            description: "Активный отдых на свежем воздухе с различными уровнями сложности для всей семьи.",
            time: "Воскресенье, 11:00 - 14:00",
            location: "Парк приключений 'Высота'"
          }
        ]
      },
      "default": {
        content: "Вот что я могу предложить:",
        activities: [
          {
            title: "Семейный пикник в парке",
            description: "Отличный способ провести время на природе всей семьей. Можно взять настольные игры и спортивный инвентарь.",
            time: "Суббота, 12:00 - 16:00",
            location: "Центральный парк"
          }
        ]
      }
    };

    return responses[query] || responses.default;
  };

  const handleSubmit = async (content) => {
    if (!content.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), content, isAi: false }]);
    setInputValue('');
    setShowSuggestions(false);
    setIsThinking(true);

    setTimeout(() => {
      const response = generateAIResponse(content);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: response.content,
        activities: response.activities,
        isAi: true
      }]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-rose-100/60 to-amber-100/60 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r from-sky-100/60 to-indigo-100/60 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onChatDelete={handleChatDelete}
        onNewChat={handleNewChat}
        onChatRename={handleChatRename}
      />

      <div className="relative min-h-screen pt-16 pl-72">
        <div className="h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {chats.find(chat => chat.id === activeChatId)?.name || 'AI Ассистент'}
                </h2>
                <p className="text-sm text-gray-500">Всегда на связи</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 gap-3 mb-6"
                >
                  {suggestedPrompts.map((prompt, index) => (
                    <SuggestedPrompt
                      key={index}
                      prompt={prompt.prompt}
                      icon={prompt.icon}
                      description={prompt.description}
                      onClick={handleSubmit}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {messages.map(message => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isAi={message.isAi}
                onActivityAction={handleActivityAction}
              />
            ))}
            {isThinking && (
              <MessageBubble
                message={{ content: "", thinking: true }}
                isAi={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(inputValue);
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400/20 focus:border-rose-400 transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium hover:shadow-lg hover:shadow-rose-200/50 transition-shadow duration-200"
              >
                Отправить
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 