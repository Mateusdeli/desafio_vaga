import Transaction from "modules/transactions/models/transaction.model";
import transactionRepository from "modules/transactions/repositories/transaction.repository";
import FilterTransactionDTO from "../dtos/filter-transaction.dto";

async function create(transaction: Transaction) {
  const transactionExists = await transactionRepository.find({
    id: transaction.id,
  });
  if (transactionExists) return;
  await transactionRepository.create(transaction);
}

async function getAll(
  page: number,
  limit: number,
  filters?: FilterTransactionDTO
) {
  return await transactionRepository.getAll(page, limit, filters);
}

export default {
  getAll,
  create,
};
