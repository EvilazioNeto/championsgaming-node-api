import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { JogadorJogoProvider } from "../../database/providers/JogadoreJogo";
import { IJogadorJogo } from "../../database/models/JogadorJogo";

interface IBodyProps extends Omit<IJogadorJogo, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        jogadorId: yup.number().integer().required().moreThan(0),
        jogoId: yup.number().integer().required().moreThan(0),
        gols: yup.number().integer().required(),
        assistencias: yup.number().integer().required(),
        cartaoAmarelo: yup.number().integer().required(),
        cartaoVermelho: yup.number().integer().required()
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await JogadorJogoProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

}