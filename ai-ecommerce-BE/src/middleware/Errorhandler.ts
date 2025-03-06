import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error'});
}

export default errorHandler;
