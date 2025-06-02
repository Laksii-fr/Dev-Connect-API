import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function enhancer(blogdata) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or "gpt-4.1"
    messages: [
      {
        role: "system",
        content: `You are a professional blog writer. Improve the given blog content for readability, structure, grammar, and engagement. What you write should be suitable for a general audience and maintain the original meaning. Do not add or change the topic. Focus on enhancing the existing content. Dont actually tell use what you are doing, just return the enhanced content. avoid any interaction with user and just return the enhanced content. Don't write anything like "Here is the enhanced content", "If you have any issues or questions, feel free to reach out for help." or "I have improved the content". Just return the enhanced content directly.`,
      },
      {
        role: "user",
        content: `Title: ${blogdata.title}\nDescription: ${blogdata.description}\nContent: ${blogdata.content}`
      }
    ]
  });

  return completion.choices[0].message.content;
}

export default enhancer;


