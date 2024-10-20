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

    public async getInvoices(): Promise<Invoice[]> {
        try {
            const prisma = new PrismaClient();
            return await prisma.invoice.findMany();
        } catch (error) {
            throw new Error('Erro ao salvar dados: ' + error);
        }
    }

    public async getInvoicesbydate(data: Invoice): Promise<any> {
        try {
            const prisma = new PrismaClient();
            return await prisma.invoice.findMany({
                where: {
                    referenceMonth: data.referenceMonth,
                    customerNumber: data.customerNumber
                }
            });
        } catch (error) {
            throw new Error('Erro ao salvar dados: ' + error);
        }
    }
}
