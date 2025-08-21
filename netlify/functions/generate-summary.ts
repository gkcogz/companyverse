// netlify/functions/generate-summary.ts
import type { Handler, HandlerEvent } from "@netlify/functions";
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Supabase ve OpenAI client'larını fonksiyon dışında oluşturuyoruz
// Bu sayede her istekte yeniden oluşturulmazlar, performansı artırır
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Sunucu tarafı olduğu için SERVICE_KEY kullanıyoruz
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const handler: Handler = async (event: HandlerEvent) => {
  const companyId = event.queryStringParameters?.companyId;

  if (!companyId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Company ID is required" }),
    };
  }

  try {
    // 1. Supabase'den bu companyId'ye ait tüm yorumları çek
    const { data: reviews, error: fetchError } = await supabase
      .from('reviews')
      .select('content, rating')
      .eq('company_id', companyId);

    if (fetchError) throw new Error(fetchError.message);
    if (!reviews || reviews.length < 5) { // Özet oluşturmak için minimum yorum sayısı
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Not enough reviews to generate a summary." }),
      };
    }

    // 2. Yorumları OpenAI'a gönderilecek bir "prompt" için birleştir
    const reviewsText = reviews
      .map(r => `Rating: ${r.rating}/5\nComment: ${r.content}\n---`)
      .join('\n');

    const prompt = `
      You are a data analyst for a company review platform called CompanyVerse.
      Your task is to analyze the following user reviews for a company and provide a concise, neutral, and helpful summary.
      The summary should highlight the most frequently mentioned positive and negative points.
      Do not make up information. Base your summary strictly on the reviews provided.
      The summary should be about 2-3 sentences long.

      Here are the reviews:
      ---
      ${reviewsText}
      ---
      Summary:
    `;

    // 3. OpenAI'dan özeti iste
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo', // Hızlı ve düşük maliyetli model
      temperature: 0.5,
      max_tokens: 150,
    });

    const aiSummary = chatCompletion.choices[0].message.content?.trim();

    if (!aiSummary) {
      throw new Error("AI failed to generate a summary.");
    }

    // 4. Aldığın özeti Supabase'deki ilgili şirketin 'ai_summary' sütununa kaydet
    const { error: updateError } = await supabase
      .from('companies')
      .update({ ai_summary: aiSummary })
      .eq('id', companyId);

    if (updateError) throw new Error(updateError.message);

    // Başarılı olursa, oluşturulan özeti geri döndür
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: aiSummary }),
    };

  } catch (error) {
    console.error("Error in generate-summary function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };