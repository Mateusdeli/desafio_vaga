import { client } from "..";
import { customerSchema } from "./Customer.schema";

export const transactionSchema = new client.Schema({
  id: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  customer: [customerSchema]
});

const Transaction = client.model("Transaction", transactionSchema);

export default Transaction;
