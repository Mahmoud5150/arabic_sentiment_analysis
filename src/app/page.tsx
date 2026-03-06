
"use client";

import { useState, useEffect } from "react";
import { TextClassifierForm } from "@/components/TextClassifierForm";
import { SocialLinks } from "@/components/SocialLinks";
import { SentimentLogo } from "@/components/SentimentLogo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      {/* عناصر الخلفية التفاعلية */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] transition-transform duration-[1200ms] ease-out mix-blend-soft-light"
          style={{
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] transition-transform duration-[800ms] ease-out mix-blend-screen"
          style={{
            transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          }}
        />
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[15%] w-[700px] h-[700px] bg-secondary/15 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>

      <main className="flex-1 container max-w-7xl mx-auto px-6 pt-12 pb-16 relative z-10">
        <header className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-white/50 backdrop-blur-xl mb-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-primary/10 p-4 hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-default">
            <SentimentLogo className="text-primary" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tight leading-tight drop-shadow-sm">
              محلل المشاعر الذكي
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-4">
                نظام تحليل مشاعر عربي يعتمد على تقنيات معالجة اللغة الطبيعية (NLP) لتصنيف النصوص بدقة بين الإيجابي والسلبي.
              </p>
              
              <Accordion type="single" collapsible className="w-full border-none">
                <AccordionItem value="details" className="border-none">
                  <AccordionTrigger className="text-primary/70 hover:text-primary font-bold text-sm justify-center gap-2 py-0 hover:no-underline">
                    عن النموذج التقني (اضغط للتفاصيل)
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground/80 pt-4 text-base leading-relaxed text-right">
                    نظام تحليل مشاعر عربي يعتمد على تقنيات معالجة اللغة الطبيعية (NLP) باستخدام <span dir="ltr" className="inline-block px-1.5 py-0.5 bg-primary/5 rounded">TF-IDF (Unigram & Bigram)</span> لاستخراج الميزات النصية، مع شبكة عصبية متعددة الطبقات (PyTorch MLP) للتصنيف الثنائي (إيجابي/سلبي). تم تدريب النموذج على أكثر من <span className="font-bold text-primary">150 ألف</span> مراجعة عربية بعد تطبيق خوارزميات تنظيف وتطبيع لغوي متقدم (إزالة التشكيل، توحيد الحروف، تقليل التكرار، إزالة الرموز)، مع استخدام F1-Score Macro للتقييم لضمان أداء متوازن ودقة تصنيف عالية.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <TextClassifierForm />
        </section>
      </main>

      <SocialLinks />
    </div>
  );
}
