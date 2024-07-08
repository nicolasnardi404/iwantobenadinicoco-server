import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generatePoem() {
  try {
    const randomMessage = [
      {
        role: "user",
        content: "Write existential poems about being a machine",
      },
      { role: "user", content: "Write poems about machines and love" },
      {
        role: "user",
        content:
          "Write experimental poems about nonsense topics that make sense in the end",
      },
      {
        role: "user",
        content:
          "Craft a poem contemplating the transformation into mushrooms or machines upon death",
      },
      { role: "user", content: "Write a poem reflecting society of the world" },
    ];

    function getRandomMessage() {
      const randomIndex = Math.floor(Math.random() * randomMessage.length);
      return randomMessage[randomIndex];
    }

    const chooseMessage = getRandomMessage();
    console.log(chooseMessage);

    const messages = [
      {
        role: "system",
        content: "You are a poetry machine that makes poems max 20 lines",
      },
      chooseMessage,
    ];

    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:personal:copynicv-3:9UtycjS0",
      messages: messages,
    });

    const poemGenerated = response.choices[0].message.content;

    const currentDate = new Date();
    // Generate a random hour between 0 and 23
    const randomHour = Math.floor(Math.random() * 24);
    // Generate a random minute between 0 and 59
    const randomMinute = Math.floor(Math.random() * 60);
    // Generate a random second between 0 and 59
    const randomSecond = Math.floor(Math.random() * 60);

    // Create a new Date object with the random time
    const randomTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      randomHour,
      randomMinute,
      randomSecond
    );

    const result = await prisma.poetryMaker.create({
      data: {
        poem: poemGenerated,
        prompt: chooseMessage.content,
        date: randomTime,
      },
    });

    console.log(`Poem inserted with ID: ${result.id}`);
    return result; // Return the generated poem result
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
