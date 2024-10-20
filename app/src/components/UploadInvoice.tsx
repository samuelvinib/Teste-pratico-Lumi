import React, { useState } from "react";
import api from "../services/api";

const UploadInvoice: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Por favor, selecione um arquivo.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post("/invoices", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Arquivo enviado com sucesso!");
            console.log(response.data);
        } catch (error) {
            setMessage("Erro ao enviar o arquivo.");
            console.error("Erro ao enviar arquivo:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Enviar PDF da Conta</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar</button>
            {message && <p>{message}</p>}
        </div>
    );
};

// Define the style object with appropriate type
const styles: { container: React.CSSProperties } = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center', // Ensure this value is valid
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
};

export default UploadInvoice;
