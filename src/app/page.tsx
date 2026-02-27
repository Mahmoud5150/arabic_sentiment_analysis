"use client";

import { useState, useEffect } from "react";
import { TextClassifierForm } from "@/components/TextClassifierForm";
import { SocialLinks } from "@/components/SocialLinks";
import { SentimentLogo } from "@/components/SentimentLogo";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* عناصر الخلفية التفاعلية المتقدمة */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* هالة تتبع الماوس الرئيسية */}
        <div 
          className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] transition-transform duration-[1200ms] ease-out mix-blend-soft-light"
          style={{
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          }}
        />
        
        {/* هالة ثانوية بلون مختلف لتأثير متدرج */}
        <div 
          className="absolute w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] transition-transform duration-[800ms] ease-out mix-blend-screen"
          style={{
            transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          }}
        />
        
        {/* فقاعات عائمة تلقائية بألوان الهوية */}
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[15%] w-[700px] h-[700px] bg-secondary/15 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        
        {/* شبكة ناعمة جداً لإضافة ملمس تقني */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>

      <main className="flex-1 container max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
        <header className="text-center mb-16 space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-[3rem] bg-white/50 backdrop-blur-xl mb-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-primary/10 p-5 hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-default">
            <SentimentLogo className="text-primary" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tight leading-tight drop-shadow-sm">
              محلل المشاعر الذكي
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
              نظام تحليل مشاعر عربي يعتمد على تقنيات معالجة اللغة الطبيعية (NLP) باستخدام <span dir="ltr" className="inline-block px-2 py-0.5 bg-primary/5 rounded-md">TF-IDF (Unigram & Bigram)</span> لاستخراج الميزات النصية، مع شبكة عصبية متعددة الطبقات (PyTorch MLP) للتصنيف الثنائي (إيجابي/سلبي). تم تدريب النموذج على أكثر من 100 ألف مراجعة عربية بعد تطبيق خوارزميات تنظيف وتطبيع لغوي متقدم (إزالة التشكيل، توحيد الحروف، تقليل التكرار، إزالة الرموز)، مع استخدام F1-Score Macro للتقييم لضمان أداء متوازن ودقة تصنيف عالية.
            </p>
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <div className="w-full">
            <TextClassifierForm />
          </div>
        </section>
      </main>

      <SocialLinks />
    </div>
  );
}
