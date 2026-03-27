import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { job, profile } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `Write a professional freelance proposal for this job:\n${job}\n\nMy profile:\n${profile}`,
          },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      proposal: data.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json({
      proposal: "❌ Error generating proposal",
    });
  }
}