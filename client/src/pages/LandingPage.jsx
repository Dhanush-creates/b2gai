import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      // Ease-out cubic
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      titleKey: 'feature1Title', descKey: 'feature1Desc',
      emoji: '🔬',
      color: 'bg-blue-50 border-blue-100',
    },
    {
      titleKey: 'feature2Title', descKey: 'feature2Desc',
      emoji: '🌐',
      color: 'bg-orange-50 border-orange-100',
    },
    {
      titleKey: 'feature3Title', descKey: 'feature3Desc',
      emoji: '📋',
      color: 'bg-emerald-50 border-emerald-100',
    },
  ];

  const metrics = [
    { key: 'impactSchemes', value: 15, suffix: '+', emoji: '📁' },
    { key: 'impactStates', value: 28, suffix: '+', emoji: '🗺️' },
    { key: 'impactLanguages', value: 3, suffix: '', emoji: '💬' },
    { key: 'impactCitizens', value: 5000, suffix: '+', emoji: '👥' },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        {/* Warm glow */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#FF9933]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium mb-6 animate-gentle-up">
                <span className="animate-wave inline-block">👋</span>
                {t('heroTitle').split(' ').slice(0, 3).join(' ')}...
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-snug mb-5 animate-gentle-up delay-100">
                {t('heroTitle')}
              </h1>
              <p className="text-base sm:text-lg text-blue-100/70 mb-8 leading-relaxed max-w-lg animate-gentle-up delay-200">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-gentle-up delay-300">
                <Link to="/eligibility" className="btn-primary text-base px-8 py-3.5" id="hero-cta-button">
                  {t('heroCTA')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link to="/eligibility"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/20 text-white font-medium text-base hover:bg-white/10 transition-all"
                  id="hero-secondary-cta">
                  {t('heroSecondary')}
                </Link>
              </div>
            </div>

            {/* Right — trust card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <div className="space-y-5">
                  {[
                    { icon: '🛡️', title: 'Your privacy matters', desc: 'We never store your personal data. Everything runs in your browser.' },
                    { icon: '⚡', title: 'Instant results', desc: 'Get matched with eligible schemes in under 30 seconds, no sign-up needed.' },
                    { icon: '🤝', title: 'Built for everyone', desc: 'Available in English, Hindi, and Tamil with voice input for accessibility.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3.5 items-start">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-0.5">{item.title}</h3>
                        <p className="text-xs text-blue-200/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile trust row */}
          <div className="lg:hidden mt-12 flex flex-wrap gap-4 animate-fade-in delay-300">
            {['🛡️ No data stored', '⚡ Instant results', '🤝 3 Languages'].map((item, i) => (
              <span key={i} className="text-xs text-blue-100/50">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-[#FAFAF8]" id="features-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{t('featuresTitle')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('featuresSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className={`card-warm p-7 border ${f.color} transition-all duration-300 hover:-translate-y-1`}>
                <span className="text-3xl mb-4 block">{f.emoji}</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-16 bg-white" id="impact-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">{t('impactTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="card-warm p-5 text-center">
                <span className="text-2xl block mb-2">{m.emoji}</span>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  <AnimatedNumber target={m.value} suffix={m.suffix} />
                </div>
                <p className="text-xs text-gray-400 font-medium">{t(m.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl mb-4 block">🎯</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Ready to find your eligible schemes?
          </h2>
          <p className="text-gray-500 mb-8">
            Answer a few simple questions and discover schemes you qualify for — it only takes 2 minutes.
          </p>
          <Link to="/eligibility" className="btn-primary text-base px-10 py-4" id="bottom-cta-button">
            {t('heroCTA')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
