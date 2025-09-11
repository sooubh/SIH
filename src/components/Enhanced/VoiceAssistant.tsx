import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { VoiceSettings } from '../../types/enhanced';

interface VoiceAssistantProps {
  onVoiceInput: (text: string) => void;
  onSpeak: (text: string) => void;
  settings: VoiceSettings;
  onSettingsChange: (settings: VoiceSettings) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onVoiceInput,
  onSpeak,
  settings,
  onSettingsChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = settings.language;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, [settings.language, onVoiceInput]);

  const startListening = () => {
    if (recognition && settings.enabled) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis && settings.enabled) {
      // Stop any ongoing speech
      synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = settings.language;
      utterance.rate = settings.speed;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    onSpeak = speakText;
  }, [speakText]);

  if (!settings.enabled) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
      {/* Voice Input */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-full transition-colors ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>

      {/* Voice Output */}
      <button
        onClick={isSpeaking ? stopSpeaking : () => speakText('Voice assistant is ready')}
        className={`p-2 rounded-full transition-colors ${
          isSpeaking 
            ? 'bg-green-500 text-white animate-pulse' 
            : 'bg-gray-500 text-white hover:bg-gray-600'
        }`}
        title={isSpeaking ? 'Stop speaking' : 'Test voice output'}
      >
        {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* Status */}
      <div className="text-xs text-gray-600">
        {isListening && <span className="text-red-600">🎤 Listening...</span>}
        {isSpeaking && <span className="text-green-600">🔊 Speaking...</span>}
        {!isListening && !isSpeaking && <span>Voice ready</span>}
      </div>

      {/* Settings Toggle */}
      <button
        onClick={() => onSettingsChange({ ...settings, enabled: !settings.enabled })}
        className="text-xs text-blue-600 hover:text-blue-800"
      >
        Settings
      </button>
    </div>
  );
};

export default VoiceAssistant;