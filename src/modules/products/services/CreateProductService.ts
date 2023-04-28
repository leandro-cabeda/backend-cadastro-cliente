import AppError from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import IRequest from '@metadata/products/IRequest';
import Product from '@modules/products/typeorm/entities/Product';

class CreateProductService {
  public async execute(iRequestProduct: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const { name } = iRequestProduct;

    const productExists = await productsRepository.findByName(name);
    if (productExists)
      throw new AppError('There is already one product with this name');

    const product = productsRepository.create(iRequestProduct);

    const productCreate = await productsRepository.save(product);

    return productCreate;
  }
}

export default CreateProductService;
