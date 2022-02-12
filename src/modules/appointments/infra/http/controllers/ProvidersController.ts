import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';


export default class ListProvidersController {
  public async list(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const users = await listProviders.execute({
      user_id,
    });

    return response.json(users);

  }
}
