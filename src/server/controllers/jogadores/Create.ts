import { Request, Response } from "express";
import { IJogador } from "../../database/models/Jogador";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
import { JogadoresProvider } from "../../database/providers/jogadores";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IJogador, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        clubeId: yup.number().integer().moreThan(0).required(),
        dataNascimento: yup.date().required(),
        posicaoId: yup.number().integer().moreThan(0).required(),
        nacionalidade: yup.string().required(),
        numeroCamisa: yup.number().integer().moreThan(0).lessThan(100).required(),
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = JogadoresProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

}   