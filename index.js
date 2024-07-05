import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import cron from "node-cron";
import { setTimeout } from "timers/promises";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

app.get("/", async (req, res) => {
  try {
    const poems = await prisma.poetryMaker.findMany();
    res.json(poems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function generatePoem() {
  try {
    // Choosing a random topic to guide AI
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

    const result = await prisma.poetryMaker.create({
      data: {
        poem: poemGenerated,
        prompt: chooseMessage.content,
        date: new Date(),
      },
    });

    console.log(`Poem inserted with ID: ${result.id}`);
  } catch (error) {
    console.error(error.message);
  }
}

async function generatePoemWithDelay() {
  // Calculate a random delay within a 24-hour period
  const randomDelaySeconds = Math.floor(Math.random() * 86400);
  console.log(`Waiting for ${randomDelaySeconds} seconds...`);

  // Wait for the calculated delay
  await setTimeout(randomDelaySeconds * 1000); // Convert seconds to milliseconds

  // Generate the poem
  await generatePoem();

  console.log("Poem generation completed.");
}

//create a function if cron to make it runs everyday

const generatePoemCronJob = cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Starting poem generation...");
    await generatePoemWithDelay();
  },
  {
    scheduled: true,
    timezone: "Europe/Rome",
  }
);

// function to randomly choose if should write a second poem
const maybeGenerateASecondPoemCronJob = cron.schedule("0 0 * * *", async () => {
  const randomNumber = Math.random();

  if (randomNumber < 0.5) {
    // 50% chance
    console.log("Generating poem...");
    await generatePoemWithDelay();
  } else {
    console.log("Not generating second poem today.");
  }
});

generatePoemCronJob.start();
maybeGenerateASecondPoemCronJob.start();

//if you need to quickly generate a poem for testing app
generatePoem();

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
