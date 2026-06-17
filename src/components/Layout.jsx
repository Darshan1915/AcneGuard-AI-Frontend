import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    ShieldCheck, History, ScanFace, Salad, Plus,
    ChevronDown, User, LogOut, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { to: '/assessment', label: 'Skin Scan', icon: <ScanFace className="w-4 h-4" />, auth: true },
    { to: '/diet-check', label: 'Diet Check', icon: <Salad className="w-4 h-4" />, auth: true },
    { to: '/history', label: 'History', icon: <History className="w-4 h-4" />, auth: true },
];

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [actionOpen, setActionOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const actionRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (actionRef.current && !actionRef.current.contains(e.target)) setActionOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-teal-600">
                        <ShieldCheck className="w-6 h-6" />
                        <span>AcneGuard<span className="text-slate-800">AI</span></span>
                    </Link>

                    {/* Nav Links */}
                    <div className="items-center hidden gap-1 md:flex">
                        {navLinks.filter(l => !l.auth || user).map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${location.pathname === to
                                        ? 'bg-teal-50 text-teal-700'
                                        : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100'
                                    }`}
                            >
                                {icon} {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                {/* New Action Dropdown */}
                                <div className="relative" ref={actionRef}>
                                    <button
                                        onClick={() => setActionOpen(o => !o)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-bold hover:bg-teal-500 transition shadow-sm"
                                    >
                                        <Plus className="w-4 h-4" /> New <ChevronDown className="w-3 h-3" />
                                    </button>
                                    {actionOpen && (
                                        <div className="absolute right-0 z-50 w-48 mt-2 overflow-hidden bg-white border shadow-xl border-slate-200 rounded-xl">
                                            <Link to="/assessment" onClick={() => setActionOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm transition text-slate-700 hover:bg-teal-50 hover:text-teal-700">
                                                <ScanFace className="w-4 h-4 text-teal-600" /> New Skin Scan
                                            </Link>
                                            <Link to="/diet-check" onClick={() => setActionOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm transition text-slate-700 hover:bg-teal-50 hover:text-teal-700">
                                                <Salad className="w-4 h-4 text-teal-600" /> New Diet Analysis
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* User Profile */}
                                <div className="relative" ref={profileRef}>
                                    <button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-2 px-3 py-2 text-sm transition border rounded-lg border-slate-200 hover:border-teal-300">
                                        <div className="flex items-center justify-center text-xs font-bold text-white bg-teal-600 rounded-full w-7 h-7">
                                            {user.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                                        </div>
                                        <span className="hidden md:block font-medium text-slate-700 max-w-[90px] truncate">{user.name || 'Account'}</span>
                                        <ChevronDown className="w-3 h-3 text-slate-400" />
                                    </button>
                                    {profileOpen && (
                                        <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border shadow-xl w-44 border-slate-200 rounded-xl">
                                            <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-3 text-sm transition text-rose-600 hover:bg-rose-50">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-3 py-2 text-sm font-medium transition text-slate-600 hover:text-teal-600">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-bold text-white transition bg-teal-600 rounded-lg hover:bg-teal-500">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-grow px-4 pt-8 pb-16 sm:px-6 lg:px-8">
                <div className="w-full mx-auto max-w-7xl">
                    {children}
                </div>
            </main>

            <footer className="py-8 text-white border-t bg-gradient-to-r from-slate-900 to-slate-800">

                <div className="px-4 mx-auto text-center max-w-7xl">

                    <h2 className="text-2xl font-bold tracking-wide">
                        AcneGuard AI
                    </h2>

                    <p className="mt-2 text-slate-300">
                        AI-Powered Acne Detection & Personalized Skin Care Recommendation System
                    </p>

                    <div className="grid gap-4 mt-5 text-sm md:grid-cols-3">

                        <div>
                            <h4 className="font-semibold text-white">
                                Technologies
                            </h4>

                            <p className="text-slate-400">
                                React • FastAPI • TensorFlow • OpenCV • Machine Learning
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white">
                                Project Team
                            </h4>

                            <p className="text-slate-400">
                                Darshan Bankar
                                <br />
                                Sonali Patil
                                <br />
                                Lalit Wani
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white">
                                Vision
                            </h4>

                            <p className="text-slate-400">
                                Making AI-driven skin analysis accessible, accurate and personalized for everyone.
                            </p>
                        </div>

                    </div>

                    <div className="pt-4 mt-8 text-xs border-t border-slate-700 text-slate-500">
                        © {new Date().getFullYear()} AcneGuard AI | Final Year Engineering Project | Powered by Computer Vision, Deep Learning & Machine Learning
                    </div>

                </div>

            </footer>
        </div>
    );
};

export default Layout;
