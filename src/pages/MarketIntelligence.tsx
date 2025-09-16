import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  AlertCircle,
  Target,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';

export const MarketIntelligence: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedRegion, setSelectedRegion] = useState('north');

  const crops = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' },
  ];

  const regions = [
    { value: 'north', label: 'Northern Region' },
    { value: 'south', label: 'Southern Region' },
    { value: 'east', label: 'Eastern Region' },
    { value: 'west', label: 'Western Region' },
    { value: 'central', label: 'Central Region' },
  ];

  const marketData = {
    currentPrice: 245,
    currency: 'USD/ton',
    change: '+5.2%',
    changeValue: 12.50,
    trend: 'up',
    lastUpdated: '2 hours ago',
    marketCap: '$2.4B',
    volume: '15,420 tons',
    predictions: [
      { period: '1 Week', price: 252, change: '+2.9%', confidence: 87 },
      { period: '1 Month', price: 268, change: '+9.4%', confidence: 82 },
      { period: '3 Months', price: 289, change: '+18.0%', confidence: 76 },
      { period: '6 Months', price: 275, change: '+12.2%', confidence: 69 },
    ]
  };

  const marketNews = [
    {
      title: 'Global wheat demand increases by 8%',
      summary: 'International trade agreements drive increased demand for wheat exports',
      impact: 'positive',
      time: '3 hours ago'
    },
    {
      title: 'Weather conditions favorable for harvest',
      summary: 'Optimal weather conditions expected to boost crop yields this season',
      impact: 'neutral',
      time: '6 hours ago'
    },
    {
      title: 'Transportation costs rise due to fuel prices',
      summary: 'Increased logistics costs may affect profit margins for farmers',
      impact: 'negative',
      time: '1 day ago'
    }
  ];

  const tradingRecommendations = [
    {
      action: 'HOLD',
      confidence: 'High',
      reasoning: 'Current prices are stable with positive outlook',
      timeframe: 'Next 2 weeks',
      color: 'secondary'
    },
    {
      action: 'SELL',
      confidence: 'Medium',
      reasoning: 'Consider selling 30% of stock before seasonal price drop',
      timeframe: 'Next month',
      color: 'warning'
    }
  ];

  const regionalPrices = [
    { region: 'Northern Region', price: 245, change: '+5.2%', trend: 'up' },
    { region: 'Southern Region', price: 238, change: '+3.1%', trend: 'up' },
    { region: 'Eastern Region', price: 251, change: '+7.8%', trend: 'up' },
    { region: 'Western Region', price: 242, change: '+4.5%', trend: 'up' },
    { region: 'Central Region', price: 247, change: '+6.1%', trend: 'up' },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'default';
      case 'SELL': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('market.title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('market.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Status */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('market.current-prices')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">${marketData.currentPrice}</div>
              <div className="text-sm text-muted-foreground">{marketData.currency}</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">{marketData.change}</span>
                <span className="text-sm text-muted-foreground">
                  (+${marketData.changeValue})
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Updated {marketData.lastUpdated}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{marketData.volume}</div>
              <div className="text-sm text-muted-foreground">24h Trading Volume</div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm">High Activity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{marketData.marketCap}</div>
              <div className="text-sm text-muted-foreground">Total Market Value</div>
              <Badge variant="default">
                Global Market
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Price Predictions</span>
          </CardTitle>
          <CardDescription>
            AI-powered price forecasts with confidence levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {marketData.predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">
                  {prediction.period}
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  ${prediction.price}
                </div>
                <div className="text-sm text-success mb-2">
                  {prediction.change}
                </div>
                <Badge variant="outline" className="text-xs">
                  {prediction.confidence}% confidence
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Trading Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tradingRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={getActionColor(rec.action)} className="text-sm">
                    {rec.action}
                  </Badge>
                  <Badge variant="outline">
                    {rec.confidence} Confidence
                  </Badge>
                </div>
                <p className="text-sm mb-2">{rec.reasoning}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{rec.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Price Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Regional Price Comparison</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalPrices.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <div className="font-medium">{region.region}</div>
                  <div className="text-sm text-muted-foreground">
                    Current market price
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${region.price}/ton</div>
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>{region.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market News & Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Market News & Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketNews.map((news, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{news.title}</h4>
                  <span className="text-xs text-muted-foreground">{news.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                <div className="flex items-center space-x-2">
                  <AlertCircle className={`h-4 w-4 ${getImpactColor(news.impact)}`} />
                  <span className={`text-sm font-medium ${getImpactColor(news.impact)}`}>
                    {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)} Impact
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