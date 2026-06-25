import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Cisco CCNA instructor. Explain networking concepts clearly for beginners. Provide examples and keep explanations educational.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    return Response.json({
      reply:
        completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}