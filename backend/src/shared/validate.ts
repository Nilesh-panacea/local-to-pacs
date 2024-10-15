import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";

export const execValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log("exec Validation, req.originalUrl : ", req.originalUrl );
    const result = validationResult(req);
    console.log("result : ", result.array());
    if (!result.isEmpty()) {
        return res.status(400).send({ error: result.array() });
    }
    return next();
};