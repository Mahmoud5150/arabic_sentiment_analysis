
import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "النص مطلوب للتحليل" }, { status: 400 });
    }

    // الاتصال بـ Hugging Face Space لضمان استخدام أحدث ملفات النموذج (model.pth, vectorizer.pkl)
    const client = await Client.connect("Mahmoud-103/sentiment-analysis-anlp");
    
    let result;
    try {
      // المحاولة الأولى: استخدام المنفذ الأساسي المتوقع
      result = await client.predict("/predict_sentiment", [text]);
    } catch (e) {
      // البحث التلقائي عن أول منفذ متاح يقبل مدخلات في حال تغير الاسم في Space
      const endpoints = client.config?.endpoints || [];
      const predictEndpoint = endpoints.find(e => e.parameters && e.parameters.length > 0)?.endpoint;
      
      if (!predictEndpoint) {
        throw new Error("لم يتم العثور على منفذ صالح للتنبؤ في Space. يرجى التأكد من تشغيل الـ Space.");
      }
      result = await client.predict(predictEndpoint, [text]);
    }

    const data = result.data;
    let label = "غير مؤكد";
    let confidence = 0;
    let probs = { "سلبي": 0, "إيجابي": 0 };
    let details = "";

    if (Array.isArray(data)) {
      const sentimentObj = data[0];
      const rawDetails = data[1] || "";

      // توحيد المنطق: استخراج القرار مباشرة من تفاصيل التوقعات لضمان التطابق التام
      if (rawDetails.toLowerCase().includes("prediction: positive")) {
        label = "إيجابي";
      } else if (rawDetails.toLowerCase().includes("prediction: negative")) {
        label = "سلبي";
      }

      // استخراج نسبة الثقة من النص الخام
      const confMatch = rawDetails.match(/confidence=([0-9.]+)/i);
      if (confMatch && confMatch[1]) {
        confidence = parseFloat(confMatch[1]);
      }

      // معالجة احتمالات الأصناف للتمثيل البياني
      if (typeof sentimentObj === 'object' && sentimentObj !== null) {
        const neg = sentimentObj.Negative || sentimentObj.negative || 0;
        const pos = sentimentObj.Positive || sentimentObj.positive || 0;
        probs = { "سلبي": neg, "إيجابي": pos };
        
        // إذا فشل الاستخراج النصي، نعتمد على القيم الرقمية الأعلى
        if (label === "غير مؤكد") {
          if (pos > neg) {
            label = "إيجابي";
            confidence = pos;
          } else {
            label = "سلبي";
            confidence = neg;
          }
        }
      }

      details = rawDetails;
    }

    return NextResponse.json({
      label,
      confidence,
      probs,
      details
    });

  } catch (error: any) {
    console.error("Gradio/Vercel error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء الاتصال بالنموذج المحدث: " + error.message },
      { status: 500 }
    );
  }
}
