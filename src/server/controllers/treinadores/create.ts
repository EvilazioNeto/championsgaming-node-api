import { Request, Response } from "express";
import { ITreinador } from "../../database/models/Treinador";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
import { TreinadoresProvider } from "../../database/providers/treinadores";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<ITreinador, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(100),
        dataNascimento: yup.date().required(),
        nacionalidade: yup.string().required().max(100),
        clubeId: yup.number().integer().moreThan(0).required(),
        fotoUrl: yup.string().url().required().max(255),
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await TreinadoresProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

}