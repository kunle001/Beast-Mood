import { RequestHandler, Request, Response, NextFunction } from 'express';

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            fn(req, res, next)
        }catch(e){
            next(e)
        }
    }
};

export default catchAsync;
