import express from 'express';
import { privateWebRoutes, publicWebRoutes } from './web';
import apiRoutes from './api';

const routes = express.Router();

routes.use('/', [publicWebRoutes, privateWebRoutes]);

routes.get('/api/v1', function (req, res) {
    res.status(200).json({
        success: true,
        message: 'Server is up and running!',
    });
});

routes.use('/api/v1', [apiRoutes]);

// routes.use((req, res) => {
//     res.status(404).send({
//         success: false,
//         message: 'Endpoint not found',
//     });
// });

export default routes;
