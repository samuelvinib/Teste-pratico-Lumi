import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path'; // Importando o módulo path

const prisma = new PrismaClient();

async function main() {
    // Lê o arquivo JSON e faz o parsing
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data.json'), 'utf-8'));
    try{
        await prisma.invoice.createMany({
            data: data,
        });
    }catch (error) {
        console.log(error);
    }

}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
