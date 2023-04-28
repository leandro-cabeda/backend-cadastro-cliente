import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import IRequestSession from '@metadata/customers/IRequestSession';
import IResponse from '@metadata/customers/IResponse';
import { sign } from 'jsonwebtoken';

class SessionsService {
  public async execute({
    email,
    password,
  }: IRequestSession): Promise<IResponse> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findByEmail(email);

    if (!customer)
      throw new AppError('Incorrect email/password combination.', 401);

    const passwordConfirmed = await compare(password, customer.password);

    if (!passwordConfirmed)
      throw new AppError('Incorrect email/password combination.', 401);

    const token = sign({}, 'c24d59664f03d9b8ff650648ec258cea', {
      subject: customer.id,
      expiresIn: '1d',
    });

    return {
      customer,
      token,
    };
  }
}

export default SessionsService;
