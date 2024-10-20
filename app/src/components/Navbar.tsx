// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <Link to="/" style={styles.link}>Dashboard</Link>
                </li>
                <li style={styles.li}>
                    <Link to="/bills" style={styles.link}>Biblioteca de Faturas</Link>
                </li>
                <li style={styles.li}>
                    <Link to="/upload" style={styles.link}>Enviar PDF</Link> {/* Nova aba para upload */}
                </li>
            </ul>
        </nav>
    );
};

// Estilização do Navbar
const styles = {
    nav: {
        background: '#282c34',
        padding: '10px',
    },
    ul: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        padding: 0,
        margin: 0,
    },
    li: {
        display: 'inline',
    },
    link: {
        color: '#61dafb',
        textDecoration: 'none',
        fontSize: '18px',
    },
};

export default Navbar;
