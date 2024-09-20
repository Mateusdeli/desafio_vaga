import customerRepository from "modules/customers/repositories/customer.repository";
import Customer from "../models/customer.model";

async function create(customer: Customer) {
  const customerExists = await customerRepository.find({ cpfCnpj: customer.cpfCnpj });
  if (customerExists) return;
  await customerRepository.create(customer);
}

export default {
  create,
};
