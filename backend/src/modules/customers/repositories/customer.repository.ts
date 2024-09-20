import CustomerSchema from 'database/mongo/schemas/Customer.schema';
import Customer from '../models/customer.model';

async function create(customer: Customer): Promise<void> {
  try {
    const customerSchema = new CustomerSchema({
      name: customer.name,
      cpfCnpj: customer.cpfCnpj
    });
    await customerSchema.save();
  } catch (error) {
    throw new Error("Unable to create customer");
  }
}

async function find(filter: Partial<Customer>) {
  try {
    const customer = await CustomerSchema.findOne(filter);
    return customer;
  } catch (error) {
    throw new Error("Unable to get customer");
  }
}

export default {
  create,
  find,
};
