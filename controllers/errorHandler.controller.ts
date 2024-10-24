import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// FUNCTION FOR HANDLING TOKEN AND MONGOOSE ERRORS
const handleDuplicateErrorDB = (error: any) => {
    const message = `${error.keyValue.name} is taken already, please try another name`;
    return new AppError(message, 400);
};

const handleCastErrorDB = (error: any) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(message, 400);
};

const handleValidationError = (error: any) => {
    const message = `${error.errors.name.path}, is either not provided or has the wrong value`;
    return new AppError(message, 400);
};

const handleJWTError = (error: any) => {
    const message = 'Please Log in';
    return new AppError(message, 400);
};

const handleTokenExpired = (error: any) => {
    const message = 'Token Expired , Login again';
    return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
    // development error:
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendProdErr = (err: AppError, res: Response) => {
    // Error to be sent to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Logging the error so the developer can see it, even when running in Production mode
        console.error('ERROR💥', err);
        // Sending a friendlier error to client
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        });
    }
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.log(process.env.MODE)
    if (process.env.MODE === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE === 'production') {
        let error: AppError;

        if (err.code === 11000) {
            error = handleDuplicateErrorDB(err);
        } else if (err.name === 'CastError') {
            error = handleCastErrorDB(err);
        } else if (err.name === 'ValidationError') {
            error = handleValidationError(err);
        } else if (err.name === 'JsonWebTokenError') {
            error = handleJWTError(err);
        } else if (err.name === 'TokenExpiredError') {
            error = handleTokenExpired(err);
        } else {
            error = new AppError('something went wrong', 400);
        }

        sendProdErr(error, res);
    }
};
