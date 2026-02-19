import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1B3A5C]">
      {/* Privacy banner */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-xs text-blue-200/60">
          <svg className="w-4 h-4 text-emerald-400/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          {t('footerDisclaimer')}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#F08030] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">GOV-AID</span>
            </div>
            <p className="text-sm text-blue-200/50 leading-relaxed max-w-xs">
              Helping every Indian citizen discover the government welfare schemes they deserve. Free, private, and accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Quick Links</h4>
            <div className="space-y-2.5">
              <a href="/" className="block text-sm text-blue-200/50 hover:text-white transition-colors">{t('navHome')}</a>
              <a href="/eligibility" className="block text-sm text-blue-200/50 hover:text-white transition-colors">{t('navEligibility')}</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Legal</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-blue-200/50 hover:text-white transition-colors">{t('footerPrivacy')}</a>
              <a href="#" className="block text-sm text-blue-200/50 hover:text-white transition-colors">{t('footerTerms')}</a>
              <a href="#" className="block text-sm text-blue-200/50 hover:text-white transition-colors">{t('footerContact')}</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-200/30">{t('footerCopyright')}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-blue-200/30 mr-1">Made with care for</span>
            <div className="w-5 h-3 rounded-sm bg-[#FF9933]"></div>
            <div className="w-5 h-3 rounded-sm bg-white"></div>
            <div className="w-5 h-3 rounded-sm bg-[#138808]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
