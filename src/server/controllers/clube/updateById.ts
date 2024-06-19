import { Request, Response } from "express";
import { IClube } from "../../database/models/Clube";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { ClubeProvider } from "../../database/providers/clube";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<IClube, 'id'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3),
        mascote: yup.string(),
        cor_principal: yup.string(),
        cor_secundaria: yup.string(),
        usuarioId: yup.number().moreThan(0)
    }))
}))

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    const result = await ClubeProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result)
}