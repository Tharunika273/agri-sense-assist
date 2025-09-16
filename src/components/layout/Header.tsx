import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Search, 
  Droplets, 
  CloudSun, 
  TrendingUp, 
  Mic,
  Menu 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { href: '/', label: t('nav.dashboard'), icon: Leaf },
    { href: '/disease-detection', label: t('nav.disease-detection'), icon: Search },
    { href: '/fertilizer', label: t('nav.fertilizer'), icon: Droplets },
    { href: '/weather', label: t('nav.weather'), icon: CloudSun },
    { href: '/market', label: t('nav.market'), icon: TrendingUp },
    { href: '/voice', label: t('nav.voice'), icon: Mic },
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary hidden sm:block">
              AgroAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* Mobile Menu Trigger */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};