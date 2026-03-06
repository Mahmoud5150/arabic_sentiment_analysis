
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle, Zap } from "lucide-react";
import { PredictionResult } from "./PredictionResult";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const EXAMPLES = [
  { label: "مثال إيجابي", text: "جميل جدا هذا المنتج" },
  { label: "مثال سلبي", text: "للأسف تجربة سيئة جدا، المنتج وصل تالفاً بقوة. خمسة نجوم!" },
  { label: "مثال عامي", text: "والله الشغل حلو مرررره، ما قصرتوا يا وحوش!" }
];

export function TextClassifierForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);

  const validateInput = (str: string) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    const onlyNumbersRegex = /^[0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const onlyEnglishRegex = /^[a-zA-Z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]*$/;

    if (!arabicRegex.test(str)) {
      if (onlyNumbersRegex.test(str)) {
        return "لا يمكن تحليل الأرقام فقط. يرجى كتابة نص باللغة العربية.";
      }
      if (onlyEnglishRegex.test(str)) {
        return "هذا النظام مخصص للغة العربية فقط. النصوص الإنجليزية غير مدعومة حالياً.";
      }
      return "يرجى إدخال نص يحتوي على حروف عربية صحيحة للتحليل.";
    }
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    
    const textToAnalyze = (customText || text).trim();
    if (!textToAnalyze || loading) return;

    const validationError = validateInput(textToAnalyze);
    if (validationError) {
      setError(validationError);
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
        body: JSON.stringify({ text: textToAnalyze }),
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

  const handleExampleClick = (exampleText: string) => {
    setText(exampleText);
    handleSubmit(undefined, exampleText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      <div className={cn(
        "grid gap-8 lg:gap-12 transition-all duration-1000",
        prediction ? "grid-cols-1 lg:grid-cols-2 items-start" : "grid-cols-1 max-w-4xl mx-auto"
      )}>
        <div className="space-y-6 flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-muted-foreground text-sm font-bold flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              جرّب أمثلة جاهزة:
            </span>
            {EXAMPLES.map((ex, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-white transition-colors py-1.5 px-4 rounded-full border-primary/20 bg-white/50 text-primary font-bold"
                onClick={() => handleExampleClick(ex.text)}
              >
                {ex.label}
              </Badge>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Textarea
                placeholder="اكتب رأيك هنا… مثال: الخدمة ممتازة والتوصيل سريع"
                className="min-h-[300px] text-xl p-8 rounded-[2.5rem] border-2 border-primary/10 focus-visible:ring-primary focus-visible:border-primary transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] bg-white/70 backdrop-blur-md hover:border-primary/30 hover:bg-white/90"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <div className="absolute bottom-6 left-8 flex gap-3 text-xs font-bold text-muted-foreground/60">
                <span className="bg-white/80 px-3 py-1 rounded-full border border-black/5">
                  {text.length} حرف
                </span>
                <span className="bg-primary/5 text-primary/70 px-3 py-1 rounded-full border border-primary/10">
                  اضغط Enter للتحليل ↵
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-16 text-xl font-black rounded-2xl shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] bg-primary hover:bg-primary/90 text-white group"
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>جاري تحليل النص...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="w-6 h-6 -rotate-12 group-hover:translate-x-1 transition-transform" />
                  <span>تحليل المشاعر الآن</span>
                </div>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="rounded-2xl border-none shadow-xl bg-red-50 text-red-900 animate-in slide-in-from-top-4">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="mr-2 font-black">تنبيه التحقق</AlertTitle>
              <AlertDescription className="mr-2 font-medium opacity-90">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {prediction && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 slide-in-from-left-8 duration-700">
            <div className="text-center md:text-right px-4">
              <p className="text-primary font-bold text-sm bg-primary/5 inline-block px-4 py-1.5 rounded-full">
                الناتج = (إيجابي/سلبي) + نسبة الثقة في التوقع
              </p>
            </div>
            <PredictionResult prediction={prediction} />
            <p className="text-center text-muted-foreground/60 text-xs font-medium px-4">
              * ملاحظة: قد تقل الدقة مع السخرية (Sarcasm) أو الخلط المكثف بين الفصحى واللهجات.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
