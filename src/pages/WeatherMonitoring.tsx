import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  CloudRain,
  Sun,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const WeatherMonitoring: React.FC = () => {
  const { t } = useTranslation();

  const currentWeather = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 8.5,
    uvIndex: 6,
    rainfall: 2.3,
    soilMoisture: 42,
    soilPH: 6.8,
    soilTemp: 24
  };

  const forecast = [
    { day: 'Today', high: 28, low: 18, condition: 'Partly Cloudy', rain: 20, icon: CloudSun },
    { day: 'Tomorrow', high: 30, low: 20, condition: 'Sunny', rain: 5, icon: Sun },
    { day: 'Wed', high: 26, low: 16, condition: 'Light Rain', rain: 70, icon: CloudRain },
    { day: 'Thu', high: 25, low: 15, condition: 'Cloudy', rain: 40, icon: CloudSun },
    { day: 'Fri', high: 29, low: 19, condition: 'Sunny', rain: 10, icon: Sun },
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'High Humidity Alert',
      message: 'Humidity levels above 60% may increase fungal disease risk',
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Optimal Irrigation Window',
      message: 'Soil moisture levels are good. Consider light irrigation in 2-3 days',
      icon: CheckCircle
    }
  ];

  const soilConditions = [
    { name: 'Moisture Level', value: currentWeather.soilMoisture, unit: '%', optimal: '35-45%', status: 'good' },
    { name: 'pH Level', value: currentWeather.soilPH, unit: '', optimal: '6.0-7.0', status: 'excellent' },
    { name: 'Temperature', value: currentWeather.soilTemp, unit: '°C', optimal: '20-25°C', status: 'good' },
    { name: 'Organic Matter', value: 3.2, unit: '%', optimal: '3-5%', status: 'good' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'warning': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('weather.title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('weather.subtitle')}
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <Card key={index} className={`border-l-4 ${
                alert.type === 'warning' ? 'border-l-warning' : 'border-l-success'
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${
                      alert.type === 'warning' ? 'text-warning' : 'text-success'
                    }`} />
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudSun className="h-5 w-5" />
            <span>Current Weather Conditions</span>
          </CardTitle>
          <CardDescription>Live weather data for your farm location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold">{currentWeather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{t('weather.temperature')}</div>
            </div>
            
            <div className="text-center">
              <Droplets className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold">{currentWeather.humidity}%</div>
              <div className="text-sm text-muted-foreground">{t('weather.humidity')}</div>
            </div>
            
            <div className="text-center">
              <Wind className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold">{currentWeather.windSpeed} km/h</div>
              <div className="text-sm text-muted-foreground">Wind Speed</div>
            </div>
            
            <div className="text-center">
              <CloudRain className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold">{currentWeather.rainfall} mm</div>
              <div className="text-sm text-muted-foreground">{t('weather.rainfall')} (24h)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="text-center p-4 rounded-lg bg-accent">
                  <div className="font-medium mb-2">{day.day}</div>
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm mb-2">{day.condition}</div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-muted-foreground">{day.low}°</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Rain: {day.rain}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Soil Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Soil Health Monitoring</span>
          </CardTitle>
          <CardDescription>Real-time soil condition analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {soilConditions.map((condition, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{condition.name}</span>
                  <Badge variant={getStatusColor(condition.status)}>
                    {condition.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-primary">
                    {condition.value}{condition.unit}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Optimal: {condition.optimal}
                  </span>
                </div>
                <Progress 
                  value={condition.status === 'excellent' ? 95 : condition.status === 'good' ? 75 : 45} 
                  className="w-full" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Trends (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="font-medium">Temperature</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Average: 26°C (+2°C from last week)
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-warning" />
                <span className="font-medium">Rainfall</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: 15mm (-5mm from last week)
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">Humidity</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Average: 62% (+8% from last week)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};