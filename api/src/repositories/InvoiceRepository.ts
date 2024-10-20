import {Invoice, PrismaClient} from '@prisma/client';

export class InvoiceRepository {

    public async saveInvoice(data: Invoice): Promise<Invoice> {  // Nome do método correto
        try {
            const prisma = new PrismaClient();
            return await prisma.invoice.create({data});
        } catch (error) {
            throw new Error('Erro ao salvar dados: ' + error);
        }
    }

    public async getInvoices(data: any): Promise<Invoice[]> {

        try {
            const prisma = new PrismaClient();

            // Construindo o objeto 'where' para filtrar
            const filters: any = {};

            if (data.customerNumber) {
                filters.customerNumber = data.customerNumber.toString();  // Se houver 'cliente', aplica o filtro
            }

            if (data.referenceMonth) {
                filters.referenceMonth = data.referenceMonth;
            }

            if (data.startDate && data.endDate) {
                filters.referenceMonth = {
                    gte: new Date(data.startDate),  // Data inicial (maior ou igual)
                    lte: new Date(data.endDate)     // Data final (menor ou igual)
                };
            }

            return await prisma.invoice.findMany({
                where: filters,
            });

        } catch (error) {
            throw new Error('Erro ao buscar dados: ' + error);
        }
    }
}
