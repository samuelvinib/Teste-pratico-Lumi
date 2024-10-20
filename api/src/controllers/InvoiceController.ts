import { Request, Response } from 'express';
import { InvoiceRepository } from '../repositories/InvoiceRepository';
import path from 'path';
import {PDFExtractor} from "../services/PDFExtractor";
import fs from 'fs/promises';

export class InvoiceController {
    private invoiceRepository: InvoiceRepository;
    private pdfExtractor: PDFExtractor;


    constructor(invoiceRepository: InvoiceRepository, PdfExtractor: PDFExtractor) {
        this.invoiceRepository = invoiceRepository;
        this.pdfExtractor = PdfExtractor;
    }

    // Método corrigido para retornar void
    public async uploadPDF(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).send('Nenhum arquivo enviado.');
            return;
        }

        try {
            const filePath = path.join(__dirname, '../../uploads', req.file.filename);
            const result = await this.pdfExtractor.extractData(filePath)
            const invoiceVerifier = await this.invoiceRepository.getInvoices(result);
            console.log(req.body)
            if (invoiceVerifier.length === 0) {
                await this.invoiceRepository.saveInvoice(result)
                res.json({ status: 'sucesso', data: result });
                return;
            }
            await fs.unlink(filePath);
            res.status(400).json({ status: 'error', data: "Fatura já salva no sistema" });
        } catch (error) {
            res.status(500).send('Erro ao processar o arquivo: ' + error);
        }
    }

    public async getInvoices(req: Request, res: Response): Promise<void> {
        try{
            const invoices = await this.invoiceRepository.getInvoices(req.body);
            res.status(200).json(invoices);
        }catch (error) {
            res.status(500).send('Erro ao processar dados: ' + error);
        }
    }

    public async downloadPDF(req: Request, res: Response): Promise<void> {
        const { filename } = req.params; // O nome do arquivo será passado como parâmetro

        const filePath = path.join(__dirname, '../../uploads', filename); // Caminho do arquivo

        try {
            // Verifica se o arquivo existe
            await fs.access(filePath); // Aqui usamos fs.promises.access

            // Chamada correta para res.download() com um callback
            res.download(filePath, (downloadError) => {
                if (downloadError) {
                    return res.status(500).send('Erro ao baixar o arquivo: ' + downloadError.message);
                }
            });
        } catch (error) {
            res.status(404).send('Arquivo não encontrado');
            return;
        }
    }
}
