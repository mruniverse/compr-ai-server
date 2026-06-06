import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function normalizeKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ');
}

const products: { name: string; price: number; unit: string }[] = [
  { name: 'Arroz', price: 24.9, unit: '5kg' },
  { name: 'Feijão', price: 8.5, unit: '1kg' },
  { name: 'Açúcar', price: 4.2, unit: '1kg' },
  { name: 'Café', price: 15.9, unit: '500g' },
  { name: 'Leite', price: 5.3, unit: '1L' },
  { name: 'Óleo de Soja', price: 7.8, unit: '900ml' },
  { name: 'Macarrão', price: 4.9, unit: '500g' },
  { name: 'Farinha de Trigo', price: 5.5, unit: '1kg' },
  { name: 'Sal', price: 2.5, unit: '1kg' },
  { name: 'Ovos', price: 18.0, unit: 'dúzia' },
  { name: 'Pão de Forma', price: 9.9, unit: '500g' },
  { name: 'Manteiga', price: 11.5, unit: '200g' },
  { name: 'Queijo Mussarela', price: 42.0, unit: '1kg' },
  { name: 'Presunto', price: 38.0, unit: '1kg' },
  { name: 'Frango', price: 14.9, unit: '1kg' },
  { name: 'Carne Moída', price: 32.9, unit: '1kg' },
  { name: 'Banana', price: 5.9, unit: '1kg' },
  { name: 'Maçã', price: 8.9, unit: '1kg' },
  { name: 'Tomate', price: 7.5, unit: '1kg' },
  { name: 'Batata', price: 6.9, unit: '1kg' },
  { name: 'Cebola', price: 5.5, unit: '1kg' },
  { name: 'Alho', price: 25.0, unit: '1kg' },
  { name: 'Refrigerante', price: 8.99, unit: '2L' },
  { name: 'Suco', price: 6.5, unit: '1L' },
  { name: 'Sabão em Pó', price: 14.9, unit: '1kg' },
  { name: 'Detergente', price: 2.8, unit: '500ml' },
  { name: 'Papel Higiênico', price: 18.9, unit: '12 rolos' },
  { name: 'Pipoca', price: 4.5, unit: '500g' },
];

async function main() {
  const now = new Date();
  for (const p of products) {
    const nameKey = normalizeKey(p.name);
    await prisma.products.upsert({
      where: { nameKey },
      update: { price: p.price, unit: p.unit },
      create: {
        name: p.name,
        nameKey,
        price: p.price,
        unit: p.unit,
        lastPrice: p.price,
        lowestPrice: p.price,
        lastRecordedAt: now,
      },
    });
  }
  console.log(`Seeded ${products.length} produtos.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
