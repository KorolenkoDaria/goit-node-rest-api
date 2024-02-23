import { isValidObjectId } from "mongoose";

import  HttpError  from "../helpers/HttpError.js";

export const isValidID = (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        next(HttpError(400, `${req.params.id} is not valid id`))
    }
    next()
}