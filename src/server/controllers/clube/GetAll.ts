import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { ClubeProvider } from "../../database/providers/clube";

interface IParamProps {
    id?: number
}

export const getAllByUserIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const getAllByUserId = async (req: Request<IParamProps>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    const result = await ClubeProvider.getAllByUserId(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}