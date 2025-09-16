import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Settings,
  Globe,
  MessageCircle,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VoiceAssistant: React.FC = () => {
  const { t, language, availableLanguages } = useTranslation();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState(language);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    message: string;
    timestamp: string;
  }>>([
    {
      type: 'assistant',
      message: 'Hello! I\'m your agricultural AI assistant. I can help you with crop diseases, fertilizer recommendations, weather analysis, and market insights. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const voiceCommands = [
    'Check crop health status',
    'Get weather forecast',
    'Analyze market prices for wheat',
    'Recommend fertilizers for tomatoes',
    'What diseases affect corn?',
    'Best time to plant soybeans',
  ];

  const capabilities = [
    {
      title: 'Crop Disease Diagnosis',
      description: 'Describe symptoms and get instant diagnosis',
      status: 'active',
      accuracy: '92%'
    },
    {
      title: 'Weather Monitoring',
      description: 'Voice-activated weather updates and alerts',
      status: 'active',
      accuracy: '98%'
    },
    {
      title: 'Market Intelligence',
      description: 'Real-time price queries and predictions',
      status: 'active',
      accuracy: '87%'
    },
    {
      title: 'Fertilizer Planning',
      description: 'Personalized fertilizer recommendations',
      status: 'active',
      accuracy: '94%'
    },
    {
      title: 'Offline Mode',
      description: 'Basic functions work without internet',
      status: 'beta',
      accuracy: '76%'
    }
  ];

  const handleStartListening = () => {
    setIsListening(true);
    toast({
      title: 'Voice Assistant Active',
      description: 'Listening for your voice command...',
    });

    // Simulate voice recognition
    setTimeout(() => {
      const simulatedUserMessage = 'What is the weather forecast for this week?';
      const timestamp = new Date().toLocaleTimeString();
      
      setConversation(prev => [...prev, {
        type: 'user',
        message: simulatedUserMessage,
        timestamp
      }]);
      
      setIsListening(false);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = 'Based on current weather data, expect partly cloudy conditions with temperatures ranging from 18°C to 28°C this week. There\'s a 20% chance of light rain on Wednesday. Soil moisture levels are optimal for most crops. Would you like more detailed information about any specific day?';
        
        setConversation(prev => [...prev, {
          type: 'assistant',
          message: aiResponse,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        handleSpeak(aiResponse);
      }, 1500);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    toast({
      title: 'Voice Assistant Stopped',
      description: 'Voice recognition has been stopped.',
    });
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);

    toast({
      title: 'AI Speaking',
      description: 'Playing response in your selected language',
    });
  };

  const handleQuickCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    setConversation(prev => [...prev, {
      type: 'user',
      message: command,
      timestamp
    }]);

    // Simulate AI processing and response
    setTimeout(() => {
      let response = '';
      
      switch (command) {
        case 'Check crop health status':
          response = 'Your crops are showing 87% health score. I detected some early signs of nitrogen deficiency in the northern field. Consider applying urea fertilizer within the next week.';
          break;
        case 'Get weather forecast':
          response = 'Tomorrow will be sunny with 29°C high and 19°C low. Perfect conditions for field work. Humidity will be 45%, ideal for preventing fungal diseases.';
          break;
        case 'Analyze market prices for wheat':
          response = 'Current wheat price is $245/ton, up 5.2% from last week. Market analysts predict continued growth over the next month. Good time to plan your harvest sales.';
          break;
        default:
          response = 'I understand your request. Let me gather the most current information to provide you with accurate guidance.';
      }
      
      setConversation(prev => [...prev, {
        type: 'assistant',
        message: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      handleSpeak(response);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'beta': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('nav.voice')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Voice-powered agricultural intelligence in your preferred language
        </p>
      </div>

      {/* Voice Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5" />
            <span>Voice Control Center</span>
          </CardTitle>
          <CardDescription>
            Interact with your AI assistant using natural speech
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Voice Button */}
          <div className="text-center">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? handleStopListening : handleStartListening}
              className="h-24 w-24 rounded-full text-lg"
              disabled={isSpeaking}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            <div className="mt-4">
              <div className="font-medium">
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to Start'}
              </div>
              <div className="text-sm text-muted-foreground">
                {isListening && 'Say your question clearly'}
                {isSpeaking && 'AI is responding'}
                {!isListening && !isSpeaking && 'Voice assistant ready'}
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-center space-x-4">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedVoiceLanguage} onValueChange={(value) => setSelectedVoiceLanguage(value as any)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                {isListening ? (
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                ) : (
                  <MicOff className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Microphone</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {isListening ? 'Active' : 'Ready'}
              </div>
            </div>
            
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                {isSpeaking ? (
                  <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Speaker</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {isSpeaking ? 'Playing' : 'Ready'}
              </div>
            </div>
            
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Activity className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">AI Status</span>
              </div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Voice Commands</CardTitle>
          <CardDescription>
            Try these common agricultural queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {voiceCommands.map((command, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickCommand(command)}
                disabled={isListening || isSpeaking}
              >
                <MessageCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>{command}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent'
                  }`}
                >
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>AI Capabilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{capability.title}</h4>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(capability.status)}
                    <Badge variant={capability.status === 'active' ? 'default' : 'secondary'}>
                      {capability.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {capability.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Accuracy</span>
                  <span className="text-sm font-medium text-primary">
                    {capability.accuracy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};