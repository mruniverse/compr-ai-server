import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function seedPermissions() {
  return prisma.permissions.create({
    data: { name: 'Tipos de Contrato', route: '/auth/tipos-contrato' },
  });
}

async function main() {
  await seedPermissions();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
