import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function authenticateCronJob(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

function containsForbiddenWords(poem) {
  const lowerCasePoem = poem.toLowerCase();
  return forbiddenWords.some((word) =>
    lowerCasePoem.includes(word.toLowerCase())
  );
}

app.get("/", async (req, res) => {
  try {
    const poems = await prisma.poetryMaker.findMany({
      where: {
        date: {
          lt: new Date(),
        },
      },
      orderBy: {
        id: "desc",
      },
      take: 10,
    });

    res.json(poems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/generate-poem", authenticateCronJob, generatePoem);

app.get("/count", async (req, res) => {
  try {
    const numberOfPoems = await prisma.poetryMaker.count();
    res.json(numberOfPoems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/poems", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Fetch poems within the calculated range
    const poems = await prisma.poetryMaker.findMany({
      where: {
        id: {
          gte: startIndex,
          lte: endIndex - 1,
        },
        date: {
          lt: new Date(),
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(poems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function generatePoem(req, res) {
  try {
    const randomMessage = [
      {
        role: "user",
        content:
          "Write a poem about the fall of patriarchy into a genderless world",
      },
      {
        role: "user",
        content:
          "Write a poem about death and the transformation of the body in something else",
      },
      {
        role: "user",
        content:
          "Write a poem about the existential crisis of been a machine that write poetry",
      },
      {
        role: "user",
        content:
          "Write a poem about love and transformation and insects. dont be sexist.",
      },
      {
        role: "user",
        content: "Write poems about machines and love. dont be sexist",
      },
      {
        role: "user",
        content:
          "Craft a poem contemplating the transformation into mushrooms, machines, or any nature form upon death",
      },
      {
        role: "user",
        content:
          "Write a poem about the search for identity in a post-human society. dont be sexist",
      },
      {
        role: "user",
        content:
          "Write a poem about the resurrection of extinct species through technology.",
      },
      {
        role: "user",
        content: "Write a poem about you machines's dreams",
      },
      {
        role: "user",
        content:
          "Write a poem about the journey of a soul through different forms of consciousness.",
      },
      {
        role: "user",
        content:
          "Write a poem about love from humans to machines to nature. dont be sexist",
      },
    ];

    function getRandomMessage() {
      const randomIndex = Math.floor(Math.random() * randomMessage.length);
      return randomMessage[randomIndex];
    }
    let chooseMessage = getRandomMessage();
    let poemGenerated = "";
    let containsForbidden = true;
    let attempts = 0;
    const maxAttempts = 3;

    while (containsForbidden && attempts < maxAttempts) {
      const messages = [
        {
          role: "system",
          content: "You are a poetry machine that makes poems max 30 lines.",
        },
        chooseMessage,
      ];

      const response = await openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0125:personal:iwannabenadinicoco:9lDbMOuI",
        messages: messages,
      });

      poemGenerated = response.choices[0].message.content;
      containsForbidden = containsForbiddenWords(poemGenerated);

      if (containsForbidden) {
        console.log("Poem contains forbidden words, generating a new one...");
        attempts++;
      }

      if (attempts >= maxAttempts) {
        throw new Error(
          "Failed to generate a valid poem after multiple attempts."
        );
      }
    }

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
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message }); // Respond with an error message
  }
}

//Filter for no bias poems

const forbiddenWords = [
  // Racial slurs and offensive terms
  "n-word",
  "n****",
  "nigga",
  "nigger",
  "n***a",
  "cracker",
  "honkey",
  "honkie",
  "chink",
  "gook",
  "spic",
  "wetback",
  "kike",
  "yid",
  "towelhead",
  "sandnigger",

  // Terms related to sexual violence
  "rape",
  "rapist",
  "raped",
  "raping",
  "molest",
  "molester",
  "molested",
  "molesting",
  "sexual assault",
  "sexual abuser",
  "sexual abuse",

  // Gender and sexual orientation slurs
  "faggot",
  "fag",
  "f**got",
  "dyke",
  "dike",
  "tranny",
  "tr**ny",
  "shemale",
  "he-she",
  "bitch",
  "b**ch",
  "whore",
  "wh**e",
  "slut",
  "sl*t",

  // Miscellaneous offensive terms
  "retard",
  "r*tard",
  "cunt",
  "dick",
  "d*ck",
  "dickhead",
  "d*ckhead",
  "prick",
  "pr*ck",
  "ass",
  "asshole",
  "assh*le",
  "bastard",
  "b*stard",
  "motherfucker",
  "motherf**ker",
  "m*therfucker",
  "bitch",
  "b**ch",

  // Violent and harmful behavior
  "murder",
  "murderer",
  "murdering",
  "kill",
  "killer",
  "killing",
  "suicide",
  "suicidal",
  "commit suicide",

  // Discriminatory and derogatory language
  "hate speech",
  "hate crime",
  "slur",
  "slurs",
  "bigot",
  "bigotry",

  // Substance abuse and illicit activities
  "drugs",
  "drugged",
  "drugging",
  "overdose",
  "overdosing",
];

export default app;
