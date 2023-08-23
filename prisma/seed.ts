import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { connect } from 'http2';

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
  console.log('Permissions added to administrator role: ', adminRole.id);

  // Attribute all permissions to the user role
  const userRole = await prisma.roles.update({
    where: { name: 'Usuário' },
    data: {
      Permissions: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });
  console.log('Permissions added to user role: ', userRole.id);

  // Create a person
  const person = await prisma.persons.create({
    data: {
      name: 'Pessoa de teste',
      cpf_cnpj: '000.000.000-00',
      email: 'admin@rocksky.com',
      phone: '(00) 00000-0000',
      address: 'Rua de teste, 00',
      city: 'Cidade de teste',
      state: 'Estado de teste',
      zipcode: '00000-000',
    },
  });
  console.log('New person created: ', person.id);

  // Create a license
  const license = await prisma.licenses.create({
    data: {
      max_users: 10,
      Person: { connect: { id: 1 } },
    },
  });
  console.log('New license created: ', license.id);

  // Create a user with the administrator role
  const hash = await bcrypt.hash('temporarypassword', 10);
  const user = await prisma.users.create({
    data: {
      name: 'Administrador',
      email: 'admin@rocksky.com',
      password: hash,
      active: true,
      avatar: 'https://i.imgur.com/1OeQZ4f.png',
      License: {
        connect: { id: 1 },
      },
      Role: {
        connect: { id: 1 },
      },
    },
  });
  console.log('New user created: ', user);
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
