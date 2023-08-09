import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.roles.createMany({
    data: [{ name: 'Administrator' }, { name: 'User' }],
  });

  console.log('New roles created: ', roles);

  const permissions = await prisma.permissions.createMany({
    data: [
      { route: '/dashboard' },
      { route: '/contracts' },
      { route: '/manage/people' },
      { route: '/manage/contracts' },
    ],
  });

  console.log('New permissions created: ', permissions);
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
