import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function swapPoemDates() {
  try {
    // Retrieve current dates of poems 4 and 5
    const poem4 = await prisma.poetryMaker.findUnique({
      where: { id: 4 },
      select: { date: true },
    });

    const poem5 = await prisma.poetryMaker.findUnique({
      where: { id: 5 },
      select: { date: true },
    });

    // Swap the dates
    await prisma.$transaction([
      prisma.poetryMaker.update({
        where: { id: 4 },
        data: { date: poem5.date },
      }),
      prisma.poetryMaker.update({
        where: { id: 5 },
        data: { date: poem4.date },
      }),
    ]);

    console.log("Dates swapped successfully!");
  } catch (error) {
    console.error("Error swapping dates:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
swapPoemDates();
