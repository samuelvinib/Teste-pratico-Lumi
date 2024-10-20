// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import '../style/Dashboard.css'; // Importa o CSS

interface EnergyData {
    month: string;
    electricEnergyQuantity: number;
    compensatedEnergyQuantity: number;
    totalValueWithoutGD: number;
    electricEnergyValue: number;
    clientNumber: string;
}

interface ApiResponse {
    customerNumber: string;
    referenceMonth: string;
    electricEnergyQuantity: number;
    compensatedEnergyQuantity: number;
    totalValueWithoutGD: number;
    electricEnergyValue: number;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<EnergyData[]>([]);
    const [filteredData, setFilteredData] = useState<EnergyData[]>([]);
    const [clientNumbers, setClientNumbers] = useState<string[]>([]);
    const [selectedClientNumber, setSelectedClientNumber] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        api.get<ApiResponse[]>("/invoices")
            .then((response) => {
                const transformedData = response.data.map((item) => ({
                    month: new Date(item.referenceMonth).toLocaleString("default", { month: "long", year: "numeric" }),
                    electricEnergyQuantity: item.electricEnergyQuantity,
                    compensatedEnergyQuantity: item.compensatedEnergyQuantity,
                    totalValueWithoutGD: item.totalValueWithoutGD,
                    electricEnergyValue: item.electricEnergyValue,
                    clientNumber: item.customerNumber,
                }))
                    // Ordenar os dados por referência do mês (do mais antigo para o mais recente)
                    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

                setData(transformedData);
                setFilteredData(transformedData);

                const uniqueClientNumbers = Array.from(new Set(transformedData.map(data => data.clientNumber)));
                setClientNumbers(uniqueClientNumbers);
            })
            .catch((error) => console.error("Erro ao buscar dados do dashboard:", error));
    }, []);

    const filterData = () => {
        const filtered = data.filter((item) => {
            const itemDate = new Date(item.month);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return (
                (selectedClientNumber ? item.clientNumber === selectedClientNumber : true) &&
                (startDate ? itemDate >= start : true) &&
                (endDate ? itemDate <= end : true)
            );
        });

        // Ordenar os dados filtrados
        const sortedFilteredData = filtered.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
        setFilteredData(sortedFilteredData);
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <div className="filter-section">
                <select
                    value={selectedClientNumber}
                    onChange={(e) => setSelectedClientNumber(e.target.value)}
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
                />
                <input
                    type="date"
                    placeholder="Data de Fim"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={filterData}>Filtrar</button>
            </div>

            <div className="cards">
                <div className="card">
                    <h3>Total de Energia Consumida</h3>
                    <p>{filteredData.reduce((acc, curr) => acc + curr.electricEnergyQuantity, 0)} kWh</p>
                </div>
                <div className="card">
                    <h3>Economia com GD</h3>
                    <p>R$ {filteredData.reduce((acc, curr) => acc + curr.electricEnergyValue, 0).toFixed(2)}</p>
                </div>
            </div>

            <div className="chart-container">
                <h3>Resultados de Energia</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="electricEnergyQuantity" stroke="#8884d8" name="Energia Consumida" />
                        <Line type="monotone" dataKey="compensatedEnergyQuantity" stroke="#82ca9d" name="Energia Compensada" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>Resultados Financeiros</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalValueWithoutGD" stroke="#8884d8" name="Valor Total sem GD" />
                        <Line type="monotone" dataKey="electricEnergyValue" stroke="#82ca9d" name="Economia GD" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
