import express from "express";
import routes from "./routes/invoiceRoutes";
import cors from "cors";

export const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api",routes);

app.listen(port, () => {
    console.log('API rodando na porta ' + port);
});