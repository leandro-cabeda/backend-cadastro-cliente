import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import IRequest from '@metadata/customers/IRequest';
import Customer from '@modules/customers/typeorm/entities/Customer';
import { hash } from 'bcryptjs';

class CreateCustomerService {
  public async execute(iRequestCustomer: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const { email, password, cpf } = iRequestCustomer;

    const cpfExists = await customersRepository.findByCpf(cpf);
    if (cpfExists) throw new AppError('CPF already used.');

    const emailExists = await customersRepository.findByEmail(email);
    if (emailExists) throw new AppError('Email address already used.');

    //const hashedPassword = await hash(password, 8);

    const customer = customersRepository.create({
      ...iRequestCustomer,
      //password: hashedPassword,
    });

    const customerCreate = await customersRepository.save(customer);

    return customerCreate;
  }
}

export default CreateCustomerService;
