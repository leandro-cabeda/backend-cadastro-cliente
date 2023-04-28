import AppError from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';
import IRequest from '@metadata/products/IRequest';

class UpdateProductService {
  public async execute(iRequestProduct: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const { id } = iRequestProduct;

    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError('Product not found', 404);

    const productUpdate = await productsRepository.save(iRequestProduct);

    return productUpdate;
  }
}

export default UpdateProductService;
