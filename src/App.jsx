import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Chat from "./pages/Chat.jsx";
import Events from "./pages/Events.jsx";
import Profile from "./pages/Profile.jsx";

const ProtectedLayout = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

const ComingSoon = ({ pageName }) => (
    <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {pageName}
                </h1>
                <p className="text-xl text-gray-600">
                    Страница находится в разработке
                </p>
            </div>
        </div>
    </div>
);

const App = () => {
    const isAuthenticated = true;

    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />

                <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/chat" element={<Chat/>} />
                    <Route path="/events" element={<Events/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;