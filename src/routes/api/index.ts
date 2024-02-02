import express from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.route';

const apiRoutes = express.Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/user', userRoutes);

export default apiRoutes;
