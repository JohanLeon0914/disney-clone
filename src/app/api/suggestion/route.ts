import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})

export async function GET(req: NextRequest) {
    const term = req.nextUrl.searchParams.get('term') as string

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a digital video assistant working for a service like Disney+. Your job is to provide suggestions based on the videos the user specifies. Keep the response short and sweet. Always provide at least 3 files as suggestions. If the user mentions a genre, you should provide a suggestion based on that.",
                },
                {
                    role: "user",
                    content: `I like ${term}`
                },
            ],
        });

        return NextResponse.json({ suggestion: completion.choices[0].message.content || "No suggestions" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
