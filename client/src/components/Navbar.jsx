import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'hi', flag: '🇮🇳', label: 'हिं' },
  { code: 'ta', flag: '🇮🇳', label: 'த' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLargeFont = () => document.documentElement.classList.toggle('large-font');
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="tricolor-ribbon fixed top-0 left-0 right-0 z-[60]" />

      <nav className="fixed top-[3px] left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#F08030] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-gray-800 tracking-tight">GOV-AID</span>
                <span className="hidden sm:block text-[11px] text-gray-400 -mt-0.5">Welfare Assistance Portal</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/"
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-[#FF9933]' : 'text-gray-500 hover:text-gray-800'}`}>
                {t('navHome')}
              </Link>
              <Link to="/eligibility"
                className={`text-sm font-medium transition-colors ${isActive('/eligibility') ? 'text-[#FF9933]' : 'text-gray-500 hover:text-gray-800'}`}>
                {t('navEligibility')}
              </Link>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language pills */}
              <div className="hidden sm:flex items-center bg-gray-50 rounded-xl p-0.5 border border-gray-100">
                {LANGUAGES.map(lng => (
                  <button key={lng.code} onClick={() => setLanguage(lng.code)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      language === lng.code
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    id={`lang-${lng.code}`}>
                    {lng.flag} {lng.label}
                  </button>
                ))}
              </div>

              {/* Font size */}
              <button onClick={toggleLargeFont}
                className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                title="Toggle large font" id="toggle-large-font">
                {t('largeFontToggle')}
              </button>

              {/* Mobile menu */}
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50"
                id="mobile-menu-toggle">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden py-3 border-t border-gray-50 animate-fade-in space-y-1">
              <Link to="/" onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${isActive('/') ? 'bg-orange-50 text-[#FF9933]' : 'text-gray-500'}`}>
                {t('navHome')}
              </Link>
              <Link to="/eligibility" onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${isActive('/eligibility') ? 'bg-orange-50 text-[#FF9933]' : 'text-gray-500'}`}>
                {t('navEligibility')}
              </Link>
              {/* Mobile language picker */}
              <div className="flex gap-1 px-4 pt-2">
                {LANGUAGES.map(lng => (
                  <button key={lng.code} onClick={() => { setLanguage(lng.code); setMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      language === lng.code ? 'bg-orange-50 text-[#FF9933]' : 'bg-gray-50 text-gray-400'
                    }`}>
                    {lng.flag} {lng.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
