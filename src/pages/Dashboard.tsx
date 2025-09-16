import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  CloudSun,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  Droplets,
  Mic,
  BarChart3,
  Thermometer,
  CloudRain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/agricultural-hero.jpg';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const quickActions = [
    {
      title: t('nav.disease-detection'),
      description: 'Analyze crop images for diseases',
      icon: Search,
      href: '/disease-detection',
      color: 'bg-accent-bright text-white'
    },
    {
      title: t('nav.fertilizer'),
      description: 'Get fertilizer recommendations',
      icon: Droplets,
      href: '/fertilizer',
      color: 'bg-primary text-primary-foreground'
    },
    {
      title: t('nav.voice'),
      description: 'Voice assistant ready',
      icon: Mic,
      href: '/voice',
      color: 'bg-secondary-warm text-foreground'
    }
  ];

  const healthMetrics = [
    { name: 'Crop Health Score', value: 87, status: 'good', trend: 'up' },
    { name: 'Disease Risk', value: 23, status: 'warning', trend: 'down' },
    { name: 'Yield Prediction', value: 92, status: 'excellent', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              {t('dashboard.title')}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {t('dashboard.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} to={action.href}>
                    <Button size="lg" variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      <Icon className="mr-2 h-5 w-5" />
                      {action.title}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthMetrics.map((metric) => (
          <Card key={metric.name} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{metric.value}%</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-warning" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={metric.value} className="w-full" />
              <Badge 
                variant={metric.status === 'excellent' ? 'default' : 
                        metric.status === 'good' ? 'secondary' : 'destructive'}
                className="mt-2"
              >
                {metric.status === 'excellent' && <CheckCircle className="w-3 h-3 mr-1" />}
                {metric.status === 'warning' && <AlertTriangle className="w-3 h-3 mr-1" />}
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Dashboard Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CloudSun className="h-5 w-5" />
              <span>{t('dashboard.weather-today')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Thermometer className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">28°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <CloudRain className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">65%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">6.8</div>
                <div className="text-sm text-muted-foreground">Soil pH</div>
              </div>
              <div className="text-center">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">42%</div>
                <div className="text-sm text-muted-foreground">Soil Moisture</div>
              </div>
            </div>
            <Link to="/weather" className="block mt-4">
              <Button variant="outline" className="w-full">
                View Detailed Weather
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Market Prices Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>{t('dashboard.market-prices')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { crop: 'Wheat', price: '$245/ton', change: '+5.2%', trend: 'up' },
                { crop: 'Rice', price: '$380/ton', change: '-2.1%', trend: 'down' },
                { crop: 'Corn', price: '$195/ton', change: '+8.7%', trend: 'up' },
                { crop: 'Soybeans', price: '$520/ton', change: '+3.4%', trend: 'up' },
              ].map((item) => (
                <div key={item.crop} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.crop}</div>
                    <div className="text-sm text-muted-foreground">{item.price}</div>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    item.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/market" className="block mt-4">
              <Button variant="outline" className="w-full">
                Market Intelligence
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* AI Recommendations */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>{t('dashboard.recommendations')}</span>
            </CardTitle>
            <CardDescription>
              Personalized insights based on your farm data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-accent">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium">Optimal Planting Window</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Weather conditions are ideal for corn planting in the next 5 days.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Disease Risk Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      High humidity detected. Monitor for fungal diseases in tomato crops.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};