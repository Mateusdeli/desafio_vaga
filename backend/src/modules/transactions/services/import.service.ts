import fs from "fs";
import readLine from "readline";
import customerService from "../../customers/services/customer.service";
import Transaction from "modules/transactions/models/transaction.model";
import transactionService from "./transaction.service";
import Customer from "modules/customers/models/customer.model";
import TransactionDTO from "../dtos/transaction.dto";
import ImportTranscationsResponseDTO from "../dtos/import-transactions-response.dto";

async function importTransactions(
  buffer: Buffer
): Promise<ImportTranscationsResponseDTO> {
  const startTime = Date.now();

  const fileContent = buffer.toString("utf-8");
  const lines = fileContent.split("\n");

  let importCount = 0;

  for (const line of lines) {
    const lineData = line.split(";").map((data) => data.trim());

    const transactionDTO = mapperToDTO(lineData);

    const customer: Customer = {
      id: transactionDTO.id,
      name: transactionDTO.nome,
      cpfCnpj: transactionDTO.cpfCnpj,
    };

    await customerService.create(customer);

    const transaction: Transaction = {
      id: transactionDTO.id,
      date: new Date(transactionDTO.data),
      price: Number(transactionDTO.valor),
      customer,
    };

    await transactionService.create(transaction);

    importCount++;
  }

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  return {
    importCount,
    executionTime: formatExecutionTime(executionTime),
  };
}

function formatExecutionTime(executionTime: number) {
  const totalSeconds = Math.floor(executionTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function mapperToDTO(lineData: string[]): TransactionDTO {
  const transactionDTO: TransactionDTO = {
    id: "",
    data: "",
    cpfCnpj: "",
    nome: "",
    valor: "",
  };
  for (const data of lineData) {
    const [key, value] = data.split(":").map((item) => item.trim());
    transactionDTO[key] = value;
  }
  return transactionDTO;
}

export default {
  importTransactions,
};
