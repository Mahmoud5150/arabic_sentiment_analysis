"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Meh, Target, Smile, Frown } from "lucide-react";

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
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <Card className="overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] bg-white/95 backdrop-blur-2xl ring-1 ring-black/5">
        <div className="bg-primary/5 p-6 border-b border-black/5 flex items-center gap-4">
          <div className={`p-2 rounded-xl shadow-inner ${theme.bgColor} transition-colors duration-500`}>
            {theme.headerIcon}
          </div>
          <h2 className="text-2xl font-black text-primary tracking-tight">التحليل النهائي للنموذج</h2>
        </div>
        
        <CardContent className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الحالة الرئيسية للنتيجة */}
            <div className={`flex flex-col items-center justify-center text-center p-8 rounded-[2rem] ${theme.bgColor} border-2 ${theme.borderColor} shadow-sm transition-all hover:scale-[1.02] duration-300`}>
              <div className="mb-4 bg-white/50 p-6 rounded-full shadow-inner">
                {theme.icon}
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-black tracking-widest text-xs uppercase bg-white/40 px-3 py-1 rounded-full">القرار النهائي</span>
                <h3 className={`text-5xl md:text-6xl font-black ${theme.color} drop-shadow-sm`}>
                  {prediction.label}
                </h3>
              </div>
            </div>

            {/* قسم الدقة */}
            <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-muted/20 border border-black/5 space-y-6 transition-all hover:bg-white hover:shadow-xl group">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <Target className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <h4 className="font-black text-xl text-foreground/80 tracking-tight">دقة التوقع</h4>
                  <p className="text-muted-foreground text-xs font-medium">موثوقية النموذج المحدث</p>
                </div>
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-3xl font-black font-mono ${theme.color}`}>
                    {confidencePercentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted/40 rounded-full overflow-hidden shadow-inner">
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
