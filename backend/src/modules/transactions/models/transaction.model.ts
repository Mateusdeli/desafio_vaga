import Customer from "modules/customers/models/customer.model";

export default interface Transaction {
  id: string;
  date: Date;
  price: number;
  customer: Customer;
}
