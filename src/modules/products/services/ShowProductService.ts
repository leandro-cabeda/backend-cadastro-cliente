import AppError from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';

class ShowProductService {
  public async execute(id: string): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }
}

export default ShowProductService;
