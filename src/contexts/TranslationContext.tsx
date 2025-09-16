import React, { createContext, useContext, useState, ReactNode } from 'react';

// Translation data structure
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.disease-detection': 'Disease Detection',
    'nav.fertilizer': 'Fertilizer Guide',
    'nav.weather': 'Weather & Soil',
    'nav.market': 'Market Intelligence',
    'nav.voice': 'Voice Assistant',
    'nav.language': 'Language',

    // Common
    'common.upload': 'Upload',
    'common.analyze': 'Analyze',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',

    // Dashboard
    'dashboard.title': 'Agricultural AI Platform',
    'dashboard.subtitle': 'Empowering smallholder farmers with intelligent crop management and market insights',
    'dashboard.crop-health': 'Crop Health Status',
    'dashboard.weather-today': 'Today\'s Weather',
    'dashboard.market-prices': 'Market Prices',
    'dashboard.recommendations': 'AI Recommendations',

    // Disease Detection
    'disease.title': 'Crop Disease Detection',
    'disease.subtitle': 'Upload crop images for AI-powered disease identification',
    'disease.upload-instruction': 'Take a clear photo of affected crop leaves or plants',
    'disease.results': 'Analysis Results',
    'disease.confidence': 'Confidence Level',
    'disease.treatment': 'Treatment Recommendations',

    // Fertilizer
    'fertilizer.title': 'Fertilizer Recommendations',
    'fertilizer.subtitle': 'Get precise fertilizer guidance based on crop and soil conditions',
    'fertilizer.crop-type': 'Crop Type',
    'fertilizer.soil-type': 'Soil Type',
    'fertilizer.growth-stage': 'Growth Stage',
    'fertilizer.recommendations': 'Fertilizer Recommendations',

    // Weather
    'weather.title': 'Weather & Soil Monitoring',
    'weather.subtitle': 'Real-time environmental conditions for your farm',
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.rainfall': 'Rainfall',
    'weather.soil-moisture': 'Soil Moisture',
    'weather.ph-level': 'pH Level',

    // Market
    'market.title': 'Market Intelligence',
    'market.subtitle': 'Price predictions and trading recommendations',
    'market.current-prices': 'Current Prices',
    'market.price-trend': 'Price Trend',
    'market.best-time-sell': 'Best Time to Sell',
    'market.demand-forecast': 'Demand Forecast',
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel Principal',
    'nav.disease-detection': 'Detección de Enfermedades',
    'nav.fertilizer': 'Guía de Fertilizantes',
    'nav.weather': 'Clima y Suelo',
    'nav.market': 'Inteligencia de Mercado',
    'nav.voice': 'Asistente de Voz',
    'nav.language': 'Idioma',

    // Common
    'common.upload': 'Subir',
    'common.analyze': 'Analizar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.submit': 'Enviar',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',

    // Dashboard
    'dashboard.title': 'Plataforma de IA Agrícola',
    'dashboard.subtitle': 'Empoderando a los pequeños agricultores con gestión inteligente de cultivos',
    'dashboard.crop-health': 'Estado de Salud del Cultivo',
    'dashboard.weather-today': 'Clima de Hoy',
    'dashboard.market-prices': 'Precios de Mercado',
    'dashboard.recommendations': 'Recomendaciones de IA',

    // Disease Detection
    'disease.title': 'Detección de Enfermedades de Cultivos',
    'disease.subtitle': 'Sube imágenes de cultivos para identificación de enfermedades con IA',
    'disease.upload-instruction': 'Toma una foto clara de hojas o plantas afectadas',
    'disease.results': 'Resultados del Análisis',
    'disease.confidence': 'Nivel de Confianza',
    'disease.treatment': 'Recomendaciones de Tratamiento',

    // Fertilizer
    'fertilizer.title': 'Recomendaciones de Fertilizantes',
    'fertilizer.subtitle': 'Obtén orientación precisa sobre fertilizantes según las condiciones del cultivo y suelo',
    'fertilizer.crop-type': 'Tipo de Cultivo',
    'fertilizer.soil-type': 'Tipo de Suelo',
    'fertilizer.growth-stage': 'Etapa de Crecimiento',
    'fertilizer.recommendations': 'Recomendaciones de Fertilizantes',

    // Weather
    'weather.title': 'Monitoreo del Clima y Suelo',
    'weather.subtitle': 'Condiciones ambientales en tiempo real para tu granja',
    'weather.temperature': 'Temperatura',
    'weather.humidity': 'Humedad',
    'weather.rainfall': 'Precipitación',
    'weather.soil-moisture': 'Humedad del Suelo',
    'weather.ph-level': 'Nivel de pH',

    // Market
    'market.title': 'Inteligencia de Mercado',
    'market.subtitle': 'Predicciones de precios y recomendaciones comerciales',
    'market.current-prices': 'Precios Actuales',
    'market.price-trend': 'Tendencia de Precios',
    'market.best-time-sell': 'Mejor Momento para Vender',
    'market.demand-forecast': 'Pronóstico de Demanda',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.disease-detection': 'रोग पहचान',
    'nav.fertilizer': 'उर्वरक गाइड',
    'nav.weather': 'मौसम और मिट्टी',
    'nav.market': 'बाजार बुद्धि',
    'nav.voice': 'आवाज सहायक',
    'nav.language': 'भाषा',

    // Common
    'common.upload': 'अपलोड',
    'common.analyze': 'विश्लेषण',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',

    // Dashboard
    'dashboard.title': 'कृषि AI प्लेटफॉर्म',
    'dashboard.subtitle': 'बुद्धिमान फसल प्रबंधन के साथ छोटे किसानों को सशक्त बनाना',
    'dashboard.crop-health': 'फसल स्वास्थ्य स्थिति',
    'dashboard.weather-today': 'आज का मौसम',
    'dashboard.market-prices': 'बाजार की कीमतें',
    'dashboard.recommendations': 'AI सिफारिशें',

    // Disease Detection
    'disease.title': 'फसल रोग पहचान',
    'disease.subtitle': 'AI-संचालित रोग पहचान के लिए फसल छवियां अपलोड करें',
    'disease.upload-instruction': 'प्रभावित फसल के पत्तों या पौधों की स्पष्ट तस्वीर लें',
    'disease.results': 'विश्लेषण परिणाम',
    'disease.confidence': 'विश्वास स्तर',
    'disease.treatment': 'उपचार सिफारिशें',

    // Fertilizer
    'fertilizer.title': 'उर्वरक सिफारिशें',
    'fertilizer.subtitle': 'फसल और मिट्टी की स्थिति के आधार पर सटीक उर्वरक मार्गदर्शन प्राप्त करें',
    'fertilizer.crop-type': 'फसल प्रकार',
    'fertilizer.soil-type': 'मिट्टी का प्रकार',
    'fertilizer.growth-stage': 'विकास चरण',
    'fertilizer.recommendations': 'उर्वरक सिफारिशें',

    // Weather
    'weather.title': 'मौसम और मिट्टी निगरानी',
    'weather.subtitle': 'आपके खेत के लिए वास्तविक समय पर्यावरणीय स्थितियां',
    'weather.temperature': 'तापमान',
    'weather.humidity': 'नमी',
    'weather.rainfall': 'वर्षा',
    'weather.soil-moisture': 'मिट्टी की नमी',
    'weather.ph-level': 'pH स्तर',

    // Market
    'market.title': 'बाजार बुद्धि',
    'market.subtitle': 'मूल्य पूर्वानुमान और व्यापारिक सिफारिशें',
    'market.current-prices': 'वर्तमान कीमतें',
    'market.price-trend': 'मूल्य प्रवृत्ति',
    'market.best-time-sell': 'बेचने का सबसे अच्छा समय',
    'market.demand-forecast': 'मांग पूर्वानुमान',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.disease-detection': 'Détection de maladies',
    'nav.fertilizer': 'Guide des engrais',
    'nav.weather': 'Météo et sol',
    'nav.market': 'Intelligence du marché',
    'nav.voice': 'Assistant vocal',
    'nav.language': 'Langue',

    // Common
    'common.upload': 'Télécharger',
    'common.analyze': 'Analyser',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.submit': 'Soumettre',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',

    // Dashboard
    'dashboard.title': 'Plateforme IA Agricole',
    'dashboard.subtitle': 'Autonomiser les petits agriculteurs avec une gestion intelligente des cultures',
    'dashboard.crop-health': 'État de santé des cultures',
    'dashboard.weather-today': 'Météo d\'aujourd\'hui',
    'dashboard.market-prices': 'Prix du marché',
    'dashboard.recommendations': 'Recommandations IA',

    // Disease Detection
    'disease.title': 'Détection de maladies des cultures',
    'disease.subtitle': 'Téléchargez des images de cultures pour l\'identification des maladies par IA',
    'disease.upload-instruction': 'Prenez une photo claire des feuilles ou plantes affectées',
    'disease.results': 'Résultats de l\'analyse',
    'disease.confidence': 'Niveau de confiance',
    'disease.treatment': 'Recommandations de traitement',

    // Fertilizer
    'fertilizer.title': 'Recommandations d\'engrais',
    'fertilizer.subtitle': 'Obtenez des conseils précis sur les engrais basés sur les conditions des cultures et du sol',
    'fertilizer.crop-type': 'Type de culture',
    'fertilizer.soil-type': 'Type de sol',
    'fertilizer.growth-stage': 'Stade de croissance',
    'fertilizer.recommendations': 'Recommandations d\'engrais',

    // Weather
    'weather.title': 'Surveillance météo et sol',
    'weather.subtitle': 'Conditions environnementales en temps réel pour votre ferme',
    'weather.temperature': 'Température',
    'weather.humidity': 'Humidité',
    'weather.rainfall': 'Précipitations',
    'weather.soil-moisture': 'Humidité du sol',
    'weather.ph-level': 'Niveau de pH',

    // Market
    'market.title': 'Intelligence du marché',
    'market.subtitle': 'Prédictions de prix et recommandations commerciales',
    'market.current-prices': 'Prix actuels',
    'market.price-trend': 'Tendance des prix',
    'market.best-time-sell': 'Meilleur moment pour vendre',
    'market.demand-forecast': 'Prévision de la demande',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'fr' as Language, name: 'French', nativeName: 'Français' },
  ];

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </TranslationContext.Provider>
  );
};