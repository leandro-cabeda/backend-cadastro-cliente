import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import SessionsRouter from '@modules/customers/routes/sessions.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({ status: 'Success', message: 'Welcome Api!' });
});

routes.use('/products', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
