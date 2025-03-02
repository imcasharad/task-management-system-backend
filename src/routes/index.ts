import { Router } from "express";
import groupRoutes from './groupRoutes';
import categoryRoutes from './categoryRoutes';

const routes = Router();

// Mount all route modules under /api
routes.use('/groups', groupRoutes);
routes.use('/categories', categoryRoutes);

// TODO: Add more routes as they are created (e.g., clients, plans, settings)
// routes.use('/clients', clientRoutes);
// routes.use('/plans', planRoutes);

export default routes;