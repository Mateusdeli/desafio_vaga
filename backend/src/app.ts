import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transcationRoutes from './modules/transactions/routes';
import { connectDB } from 'database/mongo';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
connectDB();

app.use('/transactions', transcationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});