import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { IJogo } from "../../database/models/Jogos";
import { JogosProvider } from "../../database/providers/Jogos";

interface IBodyProps extends Omit<IJogo, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        campeonatoId: yup.number().integer().moreThan(0).required(),
        dataJogo: yup.date().required(),
        clube1Id: yup.number().integer().moreThan(0).required(),
        clube2Id: yup.number().integer().moreThan(0).required(),
        golClube1: yup.number().required(),
        golClube2: yup.number().required(),
        horaJogo: yup.string().required(),
        localJogo: yup.string().required(),
        rodada: yup.number().required(),
        tipoJogo: yup.string().required()
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = JogosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

}   