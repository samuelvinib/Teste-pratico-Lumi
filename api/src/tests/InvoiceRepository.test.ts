import { InvoiceRepository } from '../repositories/InvoiceRepository';
import { PrismaClient, Invoice } from '@prisma/client';

// Mockando o PrismaClient
jest.mock('@prisma/client', () => {
    const mockPrisma = {
        invoice: {
            create: jest.fn(), // Simula o método create
            findMany: jest.fn(), // Simula o método findMany, caso seja necessário no teste
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma), // Retorna o mock quando PrismaClient for instanciado
    };
});

describe('InvoiceRepository', () => {
    let invoiceRepository: InvoiceRepository;
    let mockPrisma: any;

    beforeEach(() => {
        // Obtém o mock do Prisma a partir do jest.mock
        mockPrisma = new PrismaClient();
        invoiceRepository = new InvoiceRepository();
    });

    it('should save an invoice', async () => {
        const mockInvoice: Invoice = {
            id: 1,
            customerNumber: '123456',
            referenceMonth: new Date('2024-01-01'),
            electricEnergyQuantity: 100,
            electricEnergyValue: 200,
            sceeeEnergyQuantity: 50,
            sceeeEnergyValue: 100,
            compensatedEnergyQuantity: 20,
            compensatedEnergyValue: 40,
            publicLightingContribution: 10,
            filePath: 'path/to/file.pdf',
            totalEnergyConsumptionKWh: 150,
            totalValueWithoutGD: 350,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Simula o comportamento do método create e retorna o mockInvoice
        (mockPrisma.invoice.create as jest.Mock).mockResolvedValue(mockInvoice);

        const result = await invoiceRepository.saveInvoice(mockInvoice);

        // Verifica se o resultado é o mockInvoice e se o método create foi chamado corretamente
        expect(result).toEqual(mockInvoice);
        expect(mockPrisma.invoice.create).toHaveBeenCalledWith({ data: mockInvoice });
    });
});
