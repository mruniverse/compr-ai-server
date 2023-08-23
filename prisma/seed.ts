import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create all possible permissions
  const permissions = await prisma.permissions.createMany({
    data: [
      { name: 'Dashboard', route: '/dashboard' },
      { name: 'Contratos', route: '/contracts' },
      { name: 'Pessoa', route: '/manage/persons' },
      { name: 'Contrato', route: '/manage/contracts' },
      { name: 'Securitizadora', route: '/manage/securitization' },
      { name: 'Gestão de bens', route: '/assets' },
      { name: 'Usuários', route: '/auth/users' },
      { name: 'Licenças', route: '/auth/licenses' },
      { name: 'Permissões', route: '/auth/permissions' },
    ],
  });
  console.log('New permissions created: ', permissions);

  // Create all possible roles
  const roles = await prisma.roles.createMany({
    data: [{ name: 'Administrador' }, { name: 'Usuário' }],
  });
  console.log('New roles created: ', roles);

  // Attribute all permissions to the administrator role
  const adminRole = await prisma.roles.update({
    where: { name: 'Administrador' },
    data: {
      Permissions: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
      },
    },
  });
  console.log('Permissions added to administrator role: ', adminRole);

  // Attribute all permissions to the user role
  const userRole = await prisma.roles.update({
    where: { name: 'Usuário' },
    data: {
      Permissions: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });
  console.log('Permissions added to user role: ', userRole);
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
