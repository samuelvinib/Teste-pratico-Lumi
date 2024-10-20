// src/repositories/InvoiceRepository.ts

import { Invoice, PrismaClient } from '@prisma/client';
import prisma from '../../prisma/prisma'; // Importando a instância do PrismaClient

export class InvoiceRepository {
    public async saveInvoice(data: Invoice): Promise<Invoice> {
        try {
            return await prisma.invoice.create({ data });
        } catch (error) {
            throw new Error('Erro ao salvar dados: ' + error);
        }
    }

    public async getInvoices(filters: {
        customerNumber?: string;
        referenceMonth?: Date;
        startDate?: Date;
        endDate?: Date;
    }): Promise<Invoice[]> {
        try {
            // O prisma já está importado e não precisamos criar uma nova instância aqui

            // Construindo o objeto 'where' para filtrar
            const where: any = {};

            if (filters.customerNumber) {
                where.customerNumber = filters.customerNumber.toString();  // Se houver 'cliente', aplica o filtro
            }

            if (filters.referenceMonth) {
                where.referenceMonth = filters.referenceMonth;
            }

            if (filters.startDate && filters.endDate) {
                where.referenceMonth = {
                    gte: new Date(filters.startDate),  // Data inicial (maior ou igual)
                    lte: new Date(filters.endDate)     // Data final (menor ou igual)
                };
            }

            return await prisma.invoice.findMany({
                where,
            });

        } catch (error) {
            throw new Error('Erro ao buscar dados: ' + error);
        }
    }
}
