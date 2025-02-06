import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const prisma = new PrismaClient();

function generateToken() {
  return crypto.randomBytes(4).toString("hex");
}

async function backfillTokens() {
  try {
    console.log("Database URL:", process.env.POSTGRES_PRISMA_URL); // Debug line
    const poems = await prisma.poetryMaker.findMany({
      where: {
        token: null,
      },
    });

    for (const poem of poems) {
      const token = generateToken();
      await prisma.poetryMaker.update({
        where: { id: poem.id },
        data: { token: token },
      });
      console.log(`Updated poem ${poem.id} with token ${token}`);
    }

    console.log("Token backfill complete!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backfillTokens();
