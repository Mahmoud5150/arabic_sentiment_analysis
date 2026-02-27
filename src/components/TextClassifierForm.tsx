"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { PredictionResult } from "./PredictionResult";
import { cn } from "@/lib/utils";

export function TextClassifierForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);

  const containsArabic = (str: string) => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(str);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedText = text.trim();
    if (!trimmedText || loading) return;

    if (!containsArabic(trimmedText)) {
      setError("يرجى إدخال نص باللغة العربية للتحليل. هذا النظام مخصص للغة العربية فقط.");
      setPrediction(null);
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل معالجة الطلب");
      }

      setPrediction(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn(
      "w-full transition-all duration-1000 ease-in-out",
      "max-w-7xl mx-auto"
    )}>
      <div className={cn(
        "grid gap-12 transition-all duration-1000",
        prediction ? "grid-cols-1 lg:grid-cols-2 items-stretch" : "grid-cols-1 max-w-4xl mx-auto"
      )}>
        <div className="space-y-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Textarea
                placeholder="أدخل النص العربي المراد تحليله هنا..."
                className="min-h-[320px] text-2xl p-10 rounded-[3rem] border-2 border-primary/10 focus-visible:ring-primary focus-visible:border-primary transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] bg-white/60 backdrop-blur-md hover:border-primary/30 hover:bg-white/80"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <div className="absolute bottom-8 left-10 flex gap-4 text-sm font-bold text-muted-foreground/60">
                <span className="bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-black/5">
                  {text.length} حرف
                </span>
                <span className="bg-primary/5 text-primary px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-primary/10">
                  Enter للتحليل ↵
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-20 text-2xl font-black rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] hover:shadow-primary/40 transition-all active:scale-[0.97] bg-primary hover:bg-primary/90 text-white group"
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span>جاري معالجة النص...</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Send className="w-7 h-7 -rotate-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>تحليل المشاعر الآن</span>
                </div>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="rounded-[2rem] border-none shadow-2xl bg-red-50/90 backdrop-blur-md text-red-900 animate-in slide-in-from-top-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertTitle className="mr-3 font-black text-lg">تنبيه من النظام</AlertTitle>
              <AlertDescription className="mr-3 font-bold opacity-90 text-base">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {prediction && (
          <div className="animate-in fade-in zoom-in-95 slide-in-from-left-12 duration-1000 flex items-center">
            <PredictionResult prediction={prediction} />
          </div>
        )}
      </div>
    </div>
  );
}
