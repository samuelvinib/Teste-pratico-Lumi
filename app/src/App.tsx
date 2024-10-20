// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BillLibrary from "./components/BillLibrary";
import UploadInvoice from "./components/UploadInvoice"; // Importando o novo componente
import Navbar from "./components/Navbar";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bills" element={<BillLibrary />} />
                <Route path="/upload" element={<UploadInvoice />} /> {/* Nova rota para upload */}
            </Routes>
        </Router>
    );
};

export default App;
