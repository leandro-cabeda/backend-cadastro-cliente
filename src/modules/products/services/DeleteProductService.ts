import AppError from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError('Product not found', 404);

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
