import Customer from "../../customers/models/customer.model";

export default interface Transaction {
  id: string;
  price: number;
  date: Date;
  customer: Customer;
}
