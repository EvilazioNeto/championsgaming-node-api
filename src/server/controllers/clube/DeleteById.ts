import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { ClubeProvider } from "../../database/providers/clube";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
    id?: number
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}))

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const result = await ClubeProvider.deleteById(req.params.id);

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();

}