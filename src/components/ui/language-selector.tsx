import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/contexts/TranslationContext';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages, t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={t('nav.language')} />
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
  );
};