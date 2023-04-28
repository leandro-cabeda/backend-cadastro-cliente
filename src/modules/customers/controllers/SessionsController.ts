import { Request, Response } from 'express';
import CreateSessionsService from '@modules/customers/services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();
    const { customer, token } = await createSession.execute({
      email,
      password,
    });

    return response.status(200).json({ customer, token });
  }
}
