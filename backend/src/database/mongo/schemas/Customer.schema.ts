import { client } from "..";

export const customerSchema = new client.Schema({
    name: { type: String, required: true },
    cpfCnpj: { type: String, required: true, unique: true }
});

const Customer = client.model('Customer', customerSchema);

export default Customer;