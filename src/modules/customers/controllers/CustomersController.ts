import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomerService = new ListCustomerService();
    const customers = await listCustomerService.execute();

    return response.status(200).json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, color, observation } = request.body;

    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({
      name,
      email,
      password,
      cpf,
      color,
      observation,
    });

    return response.status(201).json({ customer });
  }
}
