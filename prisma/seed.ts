import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function seedPermissions() {
  return prisma.permissions.createMany({
    data: [
      { name: 'Dashboard', route: '/dashboard' },
      { name: 'Pessoa', route: '/manage/persons' },
      { name: 'Dívida', route: '/manage/dividas' },
      { name: 'Securitizadora', route: '/manage/securitization' },
      { name: 'Gestão de bens', route: '/assets' },
      { name: 'Usuários', route: '/auth/users' },
      { name: 'Licenças', route: '/auth/licenses' },
      { name: 'Permissões', route: '/auth/roles' },
      { name: 'Indices', route: '/auth/indices' },
      { name: 'Tipos de Contrato', route: '/auth/tipos-contrato' },
      { name: 'Regua de cobrança', route: '/auth/regua' },
    ],
  });
}

async function seedRoles() {
  await prisma.roles.createMany({
    data: [{ name: 'Administrador' }, { name: 'Usuário' }],
  });

  await prisma.roles.update({
    where: { name: 'Administrador' },
    data: {
      Permissions: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
        ],
      },
    },
  });

  return prisma.roles.update({
    where: { name: 'Usuário' },
    data: {
      Permissions: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });
}

function seedRamos() {
  return prisma.ramos.createMany({
    data: [{ name: 'Indústria' }, { name: 'Comércio' }, { name: 'Serviços' }],
  });
}

function seedPersons() {
  return prisma.persons.create({
    data: {
      name: 'Pessoa de teste',
      cpf_cnpj: '000.000.000-00',
      email: 'admin@rocksky.com',
      Ramos: { connect: { id: 1 } },
      Enderecos: {
        create: {
          cep: '00000-000',
          logradouro: 'Rua de teste, 00',
          bairro: 'Bairro de teste',
          cidade: 'Cidade de teste',
          estado: 'Estado de teste',
          numero: '00',
        },
      },
    },
  });
}

function seedLicenses() {
  return prisma.licenses.create({
    data: {
      max_users: 10,
      Person: { connect: { id: 1 } },
    },
  });
}

async function seedUsers() {
  const hash = await bcrypt.hash('temporarypassword', 10);
  return prisma.users.create({
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
}

function seedTipoGarantia() {
  return prisma.tipoGarantia.createMany({
    data: [{ name: 'Fidejussória' }, { name: 'Real' }],
  });
}

function seedStatusParcela() {
  return prisma.statusParcelas.createMany({
    data: [{ nome: 'Pendente' }, { nome: 'Pago' }, { nome: 'Atrasado' }],
  });
}

function seedRegua() {
  return prisma.reguas.create({
    data: {
      name: 'Régua Padrão',
      license_id: 1,
      tipo_regua: 'cobranca',
      active: true,
    },
  });
}

async function main() {
  await seedPermissions();
  await seedRoles();
  await seedRamos();
  await seedPersons();
  await seedLicenses();
  await seedUsers();
  await seedTipoGarantia();
  await seedStatusParcela();
  await seedRegua();
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
