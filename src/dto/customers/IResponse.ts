import Customer from '@modules/customers/typeorm/entities/Customer';

export default interface IResponse {
  customer: Customer;
  token: string;
}
