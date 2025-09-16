import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Upload,
  Camera,
  Search,
  AlertTriangle,
  CheckCircle,
  Activity,
  Leaf
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DiseaseDetection: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: t('common.error'),
        description: 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      const mockResults = [
        {
          disease: 'Early Blight',
          confidence: 87,
          severity: 'moderate',
          description: 'Fungal disease causing dark spots with concentric rings on leaves',
          treatment: [
            'Apply copper-based fungicide',
            'Ensure proper air circulation',
            'Remove affected leaves',
            'Water at soil level to avoid wetting foliage'
          ],
          prevention: [
            'Rotate crops annually',
            'Use disease-resistant varieties',
            'Maintain proper spacing between plants'
          ]
        },
        {
          disease: 'Healthy Plant',
          confidence: 13,
          severity: 'none',
          description: 'No disease detected',
          treatment: [],
          prevention: []
        }
      ];
      
      setAnalysisResult(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: t('common.success'),
        description: 'Image analysis completed successfully',
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'destructive';
      case 'moderate': return 'default';
      case 'mild': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('disease.title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('disease.subtitle')}
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Crop Image</span>
          </CardTitle>
          <CardDescription>
            {t('disease.upload-instruction')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Image File</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
          
          {selectedFile && (
            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleAnalyze} 
            disabled={!selectedFile || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                {t('common.analyze')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium">AI Analysis in Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Processing image with advanced disease detection algorithms...
                </p>
              </div>
              <Progress value={75} className="w-full" />
              <div className="text-center text-sm text-muted-foreground">
                Estimated time: 30 seconds
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>{t('disease.results')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResult.map((result: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {result.disease === 'Healthy Plant' ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-warning" />
                        )}
                        <div>
                          <h4 className="font-medium text-lg">{result.disease}</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{result.confidence}%</div>
                        <div className="text-sm text-muted-foreground">
                          {t('disease.confidence')}
                        </div>
                      </div>
                    </div>
                    
                    {result.severity !== 'none' && (
                      <Badge variant={getSeverityColor(result.severity)}>
                        {result.severity} severity
                      </Badge>
                    )}
                    
                    <Progress value={result.confidence} className="mt-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Recommendations */}
          {analysisResult[0]?.treatment?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5" />
                  <span>{t('disease.treatment')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Immediate Treatment</h4>
                    <ul className="space-y-2">
                      {analysisResult[0].treatment.map((item: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Prevention Tips</h4>
                    <ul className="space-y-2">
                      {analysisResult[0].prevention.map((item: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Activity className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};