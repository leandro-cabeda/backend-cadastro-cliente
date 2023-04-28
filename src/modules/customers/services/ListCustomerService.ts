import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customers = await customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
