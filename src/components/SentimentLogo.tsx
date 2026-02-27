"use client";

import { cn } from "@/lib/utils";

export function SentimentLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
    >
      {/* الدوائر المتداخلة */}
      <circle 
        cx="35" 
        cy="50" 
        r="30" 
        stroke="currentColor" 
        strokeWidth="2" 
        className="opacity-80"
      />
      <circle 
        cx="65" 
        cy="50" 
        r="30" 
        stroke="currentColor" 
        strokeWidth="2" 
        className="opacity-80"
      />
      
      {/* العيون - عين لكل جانب وعين مشتركة في المنتصف */}
      <circle cx="28" cy="46" r="3" fill="currentColor" />
      <circle cx="50" cy="46" r="3" fill="currentColor" />
      <circle cx="72" cy="46" r="3" fill="currentColor" />
      
      {/* مسار الفم المتعرج (ابتسامة وحزن متصلين) */}
      <path 
        d="M20 62 Q35 78 50 62 Q65 46 80 62" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
    </svg>
  );
}
