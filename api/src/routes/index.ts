import { NextFunction, Request, Response, Router } from 'express';

export const routes = Router();

routes
    .route('/test')
    .get((req: Request, res: Response, next: NextFunction) => {
        // Envia a resposta "test" para o cliente
        res.send('test');
    });
