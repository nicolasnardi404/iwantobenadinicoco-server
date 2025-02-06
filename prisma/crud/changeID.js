import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const idToUpdate = 25; // The current ID of the record you want to update
  const newId = 24; // The new ID you want to set

  const updatedRecord = await prisma.poetryMaker.update({
    where: {
      id: idToUpdate,
    },
    data: {
      id: newId,
    },
  });

  console.log(
    `Updated record with old id ${updatedRecord.id} to new id ${newId}`
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
