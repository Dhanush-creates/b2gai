import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import VoiceInput from '../components/VoiceInput';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function EligibilityChecker() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ age: '', gender: '', state: '', income: '', occupation: '', category: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  const [parsing, setParsing] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setResults(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleVoiceResult = async (transcript) => {
    setParsing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/parse-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: transcript })
      });
      const { extractedProfile: p } = await res.json();
      setForm(prev => ({
        ...prev,
        ...(p.age && { age: String(p.age) }),
        ...(p.gender && { gender: p.gender }),
        ...(p.state && { state: p.state }),
        ...(p.income && { income: String(p.income) }),
        ...(p.occupation && { occupation: p.occupation }),
        ...(p.category && { category: p.category }),
      }));
    } catch (err) { console.error(err); }
    finally { setParsing(false); }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-[76px]">
      {/* Header */}
      <div className="hero-gradient py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-3xl mb-3 block">🔍</span>
          <h1 className="text-2xl font-bold text-white mb-2">{t('eligTitle')}</h1>
          <p className="text-sm text-blue-100/60 max-w-md mx-auto">{t('eligSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4">
        {/* Privacy assurance */}
        <div className="flex items-center gap-3 bg-emerald-50 rounded-2xl px-5 py-3.5 mb-6 border border-emerald-100 animate-fade-in">
          <span className="text-lg">🛡️</span>
          <p className="text-xs text-emerald-700 leading-relaxed">{t('eligDisclaimer')}</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="card-warm p-7 mb-8 animate-gentle-up" id="eligibility-form">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Tell us about yourself</h2>
          <p className="text-sm text-gray-400 mb-6">We'll match you with relevant government schemes based on your profile.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">{t('eligAge')}</label>
              <input type="number" name="age" value={form.age} onChange={handleChange}
                className="input-field" placeholder="e.g. 30" min="0" max="120" required id="input-age" />
            </div>
            <div>
              <label className="form-label">{t('eligGender')}</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="select-field" required id="input-gender">
                <option value="">{t('eligGenderSelect')}</option>
                <option value="male">{t('eligMale')}</option>
                <option value="female">{t('eligFemale')}</option>
                <option value="other">{t('eligOther')}</option>
              </select>
            </div>
            <div>
              <label className="form-label">{t('eligState')}</label>
              <select name="state" value={form.state} onChange={handleChange} className="select-field" required id="input-state">
                <option value="">{t('eligStateSelect')}</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">{t('eligIncome')} <span className="text-gray-300 font-normal">(₹/year)</span></label>
              <input type="number" name="income" value={form.income} onChange={handleChange}
                className="input-field" placeholder="e.g. 200000" min="0" required id="input-income" />
            </div>
            <div>
              <label className="form-label">{t('eligOccupation')}</label>
              <select name="occupation" value={form.occupation} onChange={handleChange} className="select-field" required id="input-occupation">
                <option value="">{t('eligOccupationSelect')}</option>
                <option value="farmer">{t('occFarmer')}</option>
                <option value="student">{t('occStudent')}</option>
                <option value="labourer">{t('occLabourer')}</option>
                <option value="self-employed">{t('occSelfEmployed')}</option>
                <option value="business">{t('occBusiness')}</option>
                <option value="unemployed">{t('occUnemployed')}</option>
                <option value="artisan">{t('occArtisan')}</option>
                <option value="other">{t('occOther')}</option>
              </select>
            </div>
            <div>
              <label className="form-label">{t('eligCategory')}</label>
              <select name="category" value={form.category} onChange={handleChange} className="select-field" required id="input-category">
                <option value="">{t('eligCategorySelect')}</option>
                <option value="general">{t('catGeneral')}</option>
                <option value="obc">{t('catOBC')}</option>
                <option value="sc">{t('catSC')}</option>
                <option value="st">{t('catST')}</option>
              </select>
            </div>
          </div>

          {/* Voice or divider */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px bg-gray-100 flex-1"></div>
              <button type="button" onClick={() => setShowVoice(!showVoice)}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#FF9933] font-medium transition-colors px-3 py-1.5 rounded-full hover:bg-orange-50"
                id="toggle-voice-input">
                🎤 {showVoice ? 'Hide voice input' : t('eligVoice')}
              </button>
              <div className="h-px bg-gray-100 flex-1"></div>
            </div>
            {showVoice && <VoiceInput onResult={handleVoiceResult} isProcessing={parsing} />}
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3.5 text-base disabled:opacity-50 mt-2" id="submit-eligibility">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Finding your schemes...
              </span>
            ) : t('eligSubmit')}
          </button>
        </form>

        {/* Results */}
        {results && (
          <div className="animate-gentle-up" id="results-section">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                🎉 {t('eligResults')}
              </h2>
              <span className="text-sm text-gray-400 font-medium">
                {results.totalMatches} {t('eligResultCount')}
              </span>
            </div>

            {results.schemes.length === 0 ? (
              <div className="card-warm p-12 text-center">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No matches found</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">{t('eligNoResults')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.schemes.map((scheme) => (
                  <div key={scheme.id} className="scheme-result" id={`result-${scheme.id}`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-base font-semibold text-gray-800 leading-snug">
                            {scheme.name[language] || scheme.name.en}
                          </h3>
                          <span className={scheme.confidence >= 85 ? 'confidence-high' : 'confidence-medium'}>
                            {scheme.confidence >= 85 ? '✓' : '~'} {scheme.confidence}% match
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                          {scheme.description[language] || scheme.description.en}
                        </p>

                        {/* Confidence bar */}
                        <div className="w-full max-w-xs bg-gray-100 rounded-full h-1.5 mb-3">
                          <div className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            scheme.confidence >= 85 ? 'bg-emerald-400' : 'bg-amber-400'
                          }`} style={{ width: `${scheme.confidence}%` }}></div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {scheme.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                        </div>
                      </div>

                      <Link to={`/scheme/${scheme.id}`}
                        className="btn-outline self-start flex-shrink-0" id={`view-${scheme.id}`}>
                        View details
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
