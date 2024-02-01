import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getAISuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const term = request.query.get("term");

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
            {
                role: "system",
                content: `You are a digital video assistant working for service such disney+. Your job is provide sugestion based on the videos the user specifies. Keep the response short and sweet. Always at least 3 files as suggestion. If the user mentions a genre, you should provide a suggestion based on that.`,
            },
            {
                role: "user",
                content: `I like ${term}`
            },
        ],
    });

    console.log(completion.choices[0]) 

    return { body: completion.choices[0].message.content || "No suggestions" };
};

app.http('getAISuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getAISuggestion
});
