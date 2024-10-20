import { Router } from 'express';
import upload from '../utils/multerConfig';
import { InvoiceController } from '../controllers/InvoiceController';
import { InvoiceRepository } from '../repositories/InvoiceRepository';
import { PDFExtractor } from '../services/PDFExtractor';

const router = Router();

// Instanciando as classes
const pdfExtractor = new PDFExtractor();
const invoiceRepository = new InvoiceRepository();
const invoiceController = new InvoiceController(invoiceRepository, pdfExtractor);

// Definindo a rota de upload
router.post('/invoices',upload.single('file'), (req, res) => invoiceController.uploadPDF(req, res));
router.get('/invoices', (req, res) => invoiceController.getInvoices(req, res));

export default router;
