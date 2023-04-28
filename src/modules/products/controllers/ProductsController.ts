import { Request, Response } from 'express';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const productService = new ListProductService();
    const products = await productService.execute();

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = new ShowProductService();
    const product = await productService.execute(id);

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const productService = new CreateProductService();
    const product = await productService.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const productService = new UpdateProductService();
    const product = await productService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = new DeleteProductService();
    await productService.execute(id);

    return response.status(204).json([]);
  }
}
