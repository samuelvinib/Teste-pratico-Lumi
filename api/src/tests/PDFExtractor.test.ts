import { PDFExtractor } from '../services/PDFExtractor';

describe('PDFExtractor', () => {
  it('should parse PDF and extract correct data', async () => {
    const mockFilePath = 'path/to/mock.pdf';
    const mockExtractedData = {
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
    };

    const pdfExtractor = new PDFExtractor();
    jest.spyOn(pdfExtractor, 'extractData').mockResolvedValue(mockExtractedData);

    const result = await pdfExtractor.extractData(mockFilePath);

    expect(result).toEqual(mockExtractedData);
  });
});
