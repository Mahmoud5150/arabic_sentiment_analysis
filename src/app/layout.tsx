import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'محلل المشاعر الذكي - نظام تصنيف نصوص عربي متطور',
  description: 'نظام تحليل مشاعر عربي يعتمد على تقنيات معالجة اللغة الطبيعية (NLP) باستخدام TF-IDF وشبكة عصبية PyTorch MLP للتصنيف الدقيق بين الإيجابي والسلبي.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-body antialiased bg-background text-foreground selection:bg-accent/30 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
