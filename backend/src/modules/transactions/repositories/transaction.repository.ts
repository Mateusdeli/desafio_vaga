import TransactionSchema from "database/mongo/schemas/Transaction.schema";
import Transaction from "modules/transactions/models/transaction.model";
import FilterTransactionDTO from "../dtos/filter-transaction.dto";

async function create(transaction: Transaction): Promise<void> {
  try {
    const transactionSchema = new TransactionSchema(transaction);
    await transactionSchema.save();
  } catch (error) {
    throw new Error("Unable to create transaction");
  }
}

async function find(filter: Partial<Transaction>) {
  try {
    const transaction = await TransactionSchema.findOne(filter);
    return transaction;
  } catch (error) {
    throw new Error("Unable to get transaction");
  }
}

async function getAll(
  page: number,
  limit: number,
  filters?: FilterTransactionDTO
) {
  try {
    const query: any = {};
    let transactions = [];

    if (filters.name) {
      query["customer.name"] = filters.name.trim();
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      transactions = await TransactionSchema.find(query).skip(skip).limit(limit).sort({ date: 1 }).exec();
    } else {
      transactions = await TransactionSchema.find(query).sort({ date: 1 });
    }
    return {
      transactions,
      total: await TransactionSchema.countDocuments()
    };
  } catch (error) {
    throw new Error("Unable to get all transactions");
  }
}

export default {
  create,
  find,
  getAll,
};
