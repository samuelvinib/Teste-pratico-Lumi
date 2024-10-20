// src/components/BillLibrary.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import '../style/BillLibrary.css'; // Importar o arquivo CSS

interface Bill {
    clientNumber: string;
    referenceMonth: string;
    filePath: string;
}

const BillLibrary: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
    const [clientNumbers, setClientNumbers] = useState<string[]>([]);
    const [selectedClientNumber, setSelectedClientNumber] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        api.get("/invoices")
            .then((response) => {
                const transformedData = response.data.map((item: any) => ({
                    clientNumber: item.customerNumber,
                    referenceMonth: item.referenceMonth,
                    filePath: item.filePath,
                })) as Bill[];

                // Ordenar as faturas por referência do mês (do mais antigo para o mais recente)
                transformedData.sort((a, b) => new Date(a.referenceMonth).getTime() - new Date(b.referenceMonth).getTime());

                setBills(transformedData);
                setFilteredBills(transformedData);

                const uniqueClientNumbers = Array.from(new Set(transformedData.map(bill => bill.clientNumber)));
                setClientNumbers(uniqueClientNumbers);
            })
            .catch((error) => console.error("Erro ao buscar faturas:", error));
    }, []);

    const filterBills = () => {
        const filtered = bills.filter((bill: Bill) => {
            const billDate = new Date(bill.referenceMonth);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return (
                (selectedClientNumber ? bill.clientNumber === selectedClientNumber : true) &&
                (startDate ? billDate >= start : true) &&
                (endDate ? billDate <= end : true)
            );
        });

        // Ordenar as faturas filtradas
        const sortedFilteredBills = filtered.sort((a, b) => new Date(a.referenceMonth).getTime() - new Date(b.referenceMonth).getTime());
        setFilteredBills(sortedFilteredBills);
    };

    return (
        <div className="bill-library">
            <h2>Biblioteca de Faturas</h2>

            <div className="filter-section">
                <select
                    value={selectedClientNumber}
                    onChange={(e) => setSelectedClientNumber(e.target.value)}
                    className="client-select"
                >
                    <option value="">Todos</option>
                    {clientNumbers.map((number) => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>

                <input
                    type="date"
                    placeholder="Data de Início"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-input"
                />
                <input
                    type="date"
                    placeholder="Data de Fim"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-input"
                />
                <button onClick={filterBills} className="filter-button">Filtrar</button>
            </div>

            <table className="bills-table">
                <thead>
                <tr>
                    <th>Nº do Cliente</th>
                    <th>Mês</th>
                    <th>Download</th>
                </tr>
                </thead>
                <tbody>
                {filteredBills.map((bill) => (
                    <tr key={`${bill.clientNumber}-${bill.referenceMonth}`}>
                        <td>{bill.clientNumber}</td>
                        <td>{new Date(bill.referenceMonth).toLocaleString("default", { year: "numeric", month: "long", timeZone: "UTC" })}</td>
                        <td>
                            <a href={`http://localhost:3001/api/invoices/download/${bill.filePath}`} target="_blank" rel="noopener noreferrer">Download</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillLibrary;
