import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LANG_CODES = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN' };

export default function VoiceInput({ onResult, isProcessing }) {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
    }
  }, []);

  const startListening = () => {
    if (isProcessing) return; // Prevent listening while processing
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return setSupported(false);

    const recognition = new SR();
    recognition.lang = LANG_CODES[language] || 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => { setIsListening(true); setTranscript(''); };
    recognition.onresult = (e) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      setTranscript(text);
    };
    recognition.onend = () => { setIsListening(false); if (transcript) onResult(transcript); };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  if (!supported) return <p className="text-xs text-gray-400 text-center py-3">{t('voiceNotSupported')}</p>;

  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <button onClick={startListening} disabled={isListening || isProcessing}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200
          ${isListening 
            ? 'bg-red-50 text-red-500 mic-recording border-2 border-red-200' 
            : isProcessing
              ? 'bg-amber-50 text-amber-500 border-2 border-amber-200 animate-pulse'
              : 'bg-orange-50 text-[#FF9933] hover:bg-orange-100 border-2 border-orange-100'}`}
        id="voice-input-button">
        {isProcessing ? (
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        )}
      </button>

      {isListening ? (
        <span className="flex items-center gap-2 text-xs text-red-400 font-medium animate-pulse">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
          {t('voiceListening')}
        </span>
      ) : isProcessing ? (
        <span className="flex items-center gap-2 text-xs text-amber-500 font-medium">
          Processing voice command...
        </span>
      ) : (
        <p className="text-xs text-gray-400 text-center max-w-xs leading-relaxed">{t('voicePrompt')}</p>
      )}

      {transcript && (
        <div className="w-full max-w-sm bg-orange-50/50 rounded-xl p-3.5 border border-orange-100">
          <p className="text-sm text-gray-600 italic">"{transcript}"</p>
        </div>
      )}
    </div>
  );
}
