import { InvoiceController } from '../controllers/InvoiceController'; // Altere o caminho se necessário
import { InvoiceRepository } from '../repositories/InvoiceRepository';
import { Invoice } from '@prisma/client'; // Importando o tipo Invoice do Prisma
import { PDFExtractor } from '../services/PDFExtractor'; // Importar o PDFExtractor
import { Request, Response } from 'express';
import path from 'path';

jest.mock('../repositories/InvoiceRepository');
jest.mock('../services/PDFExtractor');

describe('InvoiceController', () => {
    let invoiceController: InvoiceController;
    let invoiceRepository: InvoiceRepository;
    let pdfExtractor: PDFExtractor;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        invoiceRepository = new InvoiceRepository(); // Mock da InvoiceRepository
        pdfExtractor = new PDFExtractor(); // Mock do PDFExtractor
        invoiceController = new InvoiceController(invoiceRepository, pdfExtractor); // Passa as duas dependências

        mockRequest = {
            file: {
                filename: 'mockFile.pdf',
            }
        } as Partial<Request>;

        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<Response>;
    });

    it('should save an invoice when a PDF is uploaded', async () => {
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
            filePath: path.join(__dirname, '../../uploads', 'mockFile.pdf'),
            totalEnergyConsumptionKWh: 150,
            totalValueWithoutGD: 350,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mock PDF extraction and repository save
        (pdfExtractor.extractData as jest.Mock).mockResolvedValue(mockInvoice);
        (invoiceRepository.getInvoices as jest.Mock).mockResolvedValue([]); // Assuming no duplicate found
        (invoiceRepository.saveInvoice as jest.Mock).mockResolvedValue(mockInvoice);

        await invoiceController.uploadPDF(mockRequest as Request, mockResponse as Response);

        expect(invoiceRepository.saveInvoice).toHaveBeenCalledWith(mockInvoice);
        expect(mockResponse.json).toHaveBeenCalledWith({ status: 'sucesso', data: mockInvoice });
    });
});
