import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import {Invoice} from "@prisma/client";
import {convertStringToDate} from "../utils/convertStringtoDate";

export class PDFExtractor {
    private pdfText: string[] = [];

    public async extractData(filePath: string): Promise<any> {
        const pdfBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        this.pdfText = pdfData.text.split('\n').map(line => line.trim())

        const invoiceData: Partial<Invoice> = {};
        invoiceData.customerNumber = this.getCustomerNumber();
        invoiceData.referenceMonth = convertStringToDate(this.referenceMonth()[0]);
        invoiceData.electricEnergyQuantity = parseFloat(this.getEnergy()[2]);
        invoiceData.electricEnergyValue = parseFloat(this.getEnergy()[4].replace(',', '.'));
        invoiceData.sceeeEnergyQuantity = parseFloat(this.getScee()[4]);
        invoiceData.sceeeEnergyValue = parseFloat(this.getScee()[6].replace(',', '.'));
        invoiceData.compensatedEnergyQuantity = parseFloat(this.getCompensatedEnergy()[4]);
        invoiceData.compensatedEnergyValue = parseFloat(this.getCompensatedEnergy()[6].replace(',', '.'));
        invoiceData.publicLightingContribution = parseFloat(this.getPublicLightingContribution()[4].replace(',', '.'));
        invoiceData.filePath = filePath.split('/')[5];
        invoiceData.totalEnergyConsumptionKWh = invoiceData.electricEnergyQuantity + invoiceData.sceeeEnergyQuantity;
        invoiceData.totalValueWithoutGD = parseFloat((invoiceData.electricEnergyValue + invoiceData.sceeeEnergyValue + invoiceData.publicLightingContribution).toFixed(2));

        return invoiceData;
    }

    private referenceMonth(){
        const index = this.findIndexPhrase("Referente a");
        return this.pdfText[index + 1].split(' ').filter(item => item !== '');
    }

    private getPublicLightingContribution(){
        const index = this.findIndexPhrase("Contrib Ilum Publica Municipal");
        return this.pdfText[index].split(' ').filter(item => item !== '');
    }

    private getCompensatedEnergy(){
        const index = this.findIndexPhrase("Energia compensada GD IkWh");
        return this.pdfText[index].split(' ').filter(item => item !== '');
    }


    private getScee(): string[] {
        const index = this.findIndexPhrase("Energia SCEE s/ ICMSkWh");
        return this.pdfText[index].split(' ').filter(item => item !== '');
    }

    private getEnergy(): string[] {
        const index = this.findIndexPhrase("Energia ElétricakWh");
        return this.pdfText[index].split(' ').filter(item => item !== '');
    }

    private getCustomerNumber(): string {
        const index = this.findIndexPhrase("Nº DO CLIENTE");
        return this.pdfText[index + 1].split(' ')[0];
    }

    private findIndexPhrase(text: string) {
        for (let i = 0; i < this.pdfText.length; i++) {
            if (this.pdfText[i].includes(text)) {
                return i;
            }
        }
        return -1;
    }
}
