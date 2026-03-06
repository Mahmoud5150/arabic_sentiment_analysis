
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Meh, Target, Smile, Frown, Sparkles } from "lucide-react";

interface PredictionResultProps {
  prediction: {
    label: string;
    confidence: number;
    probs: { [key: string]: number };
    details: string;
  };
}

export function PredictionResult({ prediction }: PredictionResultProps) {
  if (!prediction) return null;

  const getSentimentTheme = (label: string) => {
    if (label === "إيجابي") {
      return {
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        accentColor: "bg-emerald-500",
        icon: <ThumbsUp className="w-10 h-10 text-emerald-600" />,
        headerIcon: <Smile className="w-6 h-6 text-emerald-600" />
      };
    } else if (label === "سلبي") {
      return {
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        accentColor: "bg-rose-500",
        icon: <ThumbsDown className="w-10 h-10 text-rose-600" />,
        headerIcon: <Frown className="w-6 h-6 text-rose-600" />
      };
    } else {
      return {
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        accentColor: "bg-amber-500",
        icon: <Meh className="w-10 h-10 text-amber-600" />,
        headerIcon: <Meh className="w-6 h-6 text-amber-600" />
      };
    }
  };

  const theme = getSentimentTheme(prediction.label);
  const confidencePercentage = (prediction.confidence * 100).toFixed(1);

  return (
    <div className="w-full">
      <Card className="overflow-hidden border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] bg-white/95 backdrop-blur-2xl ring-1 ring-black/5">
        <div className="bg-primary/5 p-5 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${theme.bgColor}`}>
              {theme.headerIcon}
            </div>
            <div className="text-right">
              <h2 className="text-lg font-black text-primary leading-tight">التحليل النهائي</h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">تصنيف ثنائي: إيجابي / سلبي</p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-amber-400 opacity-50" />
        </div>
        
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الحالة الرئيسية */}
            <div className={`flex flex-col items-center justify-center text-center p-6 rounded-[2rem] ${theme.bgColor} border-2 ${theme.borderColor} shadow-sm transition-transform hover:scale-[1.02] duration-300`}>
              <div className="mb-3 bg-white/50 p-4 rounded-full shadow-inner">
                {theme.icon}
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-black text-[10px] uppercase bg-white/40 px-3 py-0.5 rounded-full">القرار النهائي</span>
                <h3 className={`text-4xl md:text-5xl font-black ${theme.color}`}>
                  {prediction.label}
                </h3>
              </div>
            </div>

            {/* الدقة */}
            <div className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-muted/20 border border-black/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-black text-lg text-foreground/80 tracking-tight">دقة التوقع</h4>
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex justify-center items-center">
                  <span className={`text-3xl font-black font-mono ${theme.color}`}>
                    {confidencePercentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-muted/40 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${theme.accentColor}`}
                    style={{ width: `${confidencePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
