import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Droplets,
  Leaf,
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FertilizerRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const crops = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'potatoes', label: 'Potatoes' },
  ];

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'silty', label: 'Silty Soil' },
    { value: 'peaty', label: 'Peaty Soil' },
  ];

  const growthStages = [
    { value: 'seedling', label: 'Seedling Stage' },
    { value: 'vegetative', label: 'Vegetative Growth' },
    { value: 'flowering', label: 'Flowering Stage' },
    { value: 'fruiting', label: 'Fruiting/Grain Formation' },
    { value: 'maturity', label: 'Maturity Stage' },
  ];

  const handleGenerateRecommendations = async () => {
    if (!selectedCrop || !selectedSoil || !selectedStage) {
      toast({
        title: t('common.error'),
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI recommendation generation
    setTimeout(() => {
      const mockRecommendations = {
        primary: {
          name: 'NPK 15-15-15',
          application: '150 kg/hectare',
          timing: 'Apply 2 weeks before flowering',
          method: 'Broadcast and incorporate into soil',
          cost: '$45/hectare',
          benefits: [
            'Balanced nutrient supply',
            'Improved flowering and fruiting',
            'Enhanced root development'
          ]
        },
        secondary: [
          {
            name: 'Urea (46-0-0)',
            application: '50 kg/hectare',
            timing: 'Split application during vegetative growth',
            purpose: 'Nitrogen boost for leaf development'
          },
          {
            name: 'Potassium Sulfate',
            application: '30 kg/hectare',
            timing: 'At fruit formation stage',
            purpose: 'Improve fruit quality and disease resistance'
          }
        ],
        organic: [
          {
            name: 'Compost',
            application: '2-3 tons/hectare',
            timing: 'Before planting',
            benefits: 'Improves soil structure and water retention'
          },
          {
            name: 'Bone Meal',
            application: '100 kg/hectare',
            timing: 'At planting',
            benefits: 'Slow-release phosphorus for root development'
          }
        ],
        schedule: [
          { week: 1, action: 'Apply compost and incorporate', fertilizer: 'Compost' },
          { week: 3, action: 'First NPK application', fertilizer: 'NPK 15-15-15' },
          { week: 6, action: 'Nitrogen boost', fertilizer: 'Urea' },
          { week: 10, action: 'Potassium application', fertilizer: 'Potassium Sulfate' },
        ],
        soilHealth: {
          currentPH: 6.8,
          recommendedPH: '6.0-7.0',
          organicMatter: '2.1%',
          nitrogenLevel: 'Medium',
          phosphorusLevel: 'Low',
          potassiumLevel: 'High'
        }
      };

      setRecommendations(mockRecommendations);
      setIsGenerating(false);

      toast({
        title: t('common.success'),
        description: 'Fertilizer recommendations generated successfully',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('fertilizer.title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('fertilizer.subtitle')}
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5" />
            <span>Crop & Soil Information</span>
          </CardTitle>
          <CardDescription>
            Provide details about your crop and soil conditions for personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">{t('fertilizer.crop-type')}</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
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
              <Label htmlFor="soil-type">{t('fertilizer.soil-type')}</Label>
              <Select value={selectedSoil} onValueChange={setSelectedSoil}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="growth-stage">{t('fertilizer.growth-stage')}</Label>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select growth stage" />
                </SelectTrigger>
                <SelectContent>
                  {growthStages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerateRecommendations}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              <>
                <Leaf className="mr-2 h-4 w-4" />
                Get {t('fertilizer.recommendations')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Results */}
      {recommendations && (
        <div className="space-y-6">
          {/* Primary Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Primary Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {recommendations.primary.name}
                    </h3>
                    <Badge variant="default" className="mt-1">
                      Best Match for Your Conditions
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Application Rate:</span>
                      <span className="font-medium">{recommendations.primary.application}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timing:</span>
                      <span className="font-medium">{recommendations.primary.timing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <span className="font-medium text-primary">{recommendations.primary.cost}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {recommendations.primary.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Supplementary Fertilizers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendations.secondary.map((item: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.name}</h4>
                      <Badge variant="secondary">{item.application}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.timing}</p>
                    <p className="text-sm">{item.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Application Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-accent rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">Week {item.week}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.action}</div>
                      <div className="text-sm text-muted-foreground">{item.fertilizer}</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Soil Health Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Soil Health Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>pH Level</span>
                    <div className="text-right">
                      <span className="font-bold">{recommendations.soilHealth.currentPH}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        (Optimal: {recommendations.soilHealth.recommendedPH})
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Organic Matter</span>
                    <span className="font-medium">{recommendations.soilHealth.organicMatter}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Nitrogen</span>
                    <Badge variant="secondary">{recommendations.soilHealth.nitrogenLevel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Phosphorus</span>
                    <Badge variant="destructive">{recommendations.soilHealth.phosphorusLevel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Potassium</span>
                    <Badge variant="default">{recommendations.soilHealth.potassiumLevel}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};