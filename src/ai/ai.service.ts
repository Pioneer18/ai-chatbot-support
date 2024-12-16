import { Injectable } from '@nestjs/common';
import { OpenAI } from "openai";

@Injectable()
export class AiService {
  private openai: OpenAI; 

  constructor() {
    const newOpenai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.openai = newOpenai;

  }

  async getResponse(prompt: string): Promise<string> {
    try {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Hello!"}],
        });
        return completion.choices[0].message.content
    } catch (error) {
      console.error('Error generating AI response', error);
      throw new Error('AI response error');
    }
  }
}
