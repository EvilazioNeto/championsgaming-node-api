import { IClubeCampeonato } from "../../database/models/ClubeCampeonato";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ClubeCampeonatoProvider } from "../../database/providers/clubeCampeonato";

interface IBodyProps extends Omit<IClubeCampeonato, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        clubeId: yup.number().integer().required().moreThan(0),
        campeonatoId: yup.number().integer().required().moreThan(0),
        vitorias: yup.number().integer().required(),
        derrotas: yup.number().integer().required(),
        empates: yup.number().integer().required(),
        golsPro: yup.number().integer().required(),
        golsContra: yup.number().integer().required(),
        cartoesAmarelos: yup.number().integer().required(),
        cartoesVermelhos: yup.number().integer().required()
    }))
}))

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = ClubeCampeonatoProvider.create(req.body)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);

}