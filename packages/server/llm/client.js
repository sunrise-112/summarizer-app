import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const llmClient = {
  async generateText({
    model = "deepseek/deepseek-v4-flash",
    temperature = 0.2,
    messages,
    maxTokens = 300,
  }) {
    const response = await client.chat.send({
      chatRequest: {
        model,
        temperature,
        maxTokens,
        messages,
      },
    });

    return {
      id: response.id,
      message: response.choices[0].message.content,
    };
  },
};
