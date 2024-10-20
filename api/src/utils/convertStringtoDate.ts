export function convertStringToDate(dateString: string) {
    const monthMapping: { [key: string]: number } = {
        "JAN": 0, // Janeiro
        "FEV": 1, // Fevereiro
        "MAR": 2, // Março
        "ABR": 3, // Abril
        "MAI": 4, // Maio
        "JUN": 5, // Junho
        "JUL": 6, // Julho
        "AGO": 7, // Agosto
        "SET": 8, // Setembro
        "OUT": 9, // Outubro
        "NOV": 10, // Novembro
        "DEZ": 11  // Dezembro
    };

    // Separa a string em mês e ano
    const [monthString, yearString] = dateString.split('/');

    // Verifica se o mês é válido e se o ano é um número
    if (monthMapping.hasOwnProperty(monthString) && !isNaN(Number(yearString))) {
        const year = Number(yearString);
        return new Date(year, monthMapping[monthString], 1); // O dia é definido como 1
    }
}

