import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { ICampeonato } from "../../database/models/Campeonato";
import { CampeonatoProvider } from "../../database/providers/campeonato";
import { Request, Response } from "express";

interface IBodyProps extends Omit<ICampeonato, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        dataInicio: yup.date().required(),
        dataFim: yup.date().required(),
        usuarioId: yup.number().required().moreThan(0),
        quantidadeTimes: yup.number().required(),
        numeroRodadas: yup.number().required(),
        status: yup.string().required(),
        fotoUrl: yup.string().url().required().max(255),
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await CampeonatoProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
}