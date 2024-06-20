
import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { ClubeCampeonatoProvider } from "../../database/providers/clubeCampeonato";
import { IClubeCampeonato } from "../../database/models/ClubeCampeonato";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<IClubeCampeonato, 'id' | 'clubeId' | 'campeonatoId'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        // clubeId: yup.number().integer().moreThan(0),
        // campeonatoId: yup.number().integer().moreThan(0),
        vitorias: yup.number().integer(),
        derrotas: yup.number().integer(),
        empates: yup.number().integer(),
        golsPro: yup.number().integer(),
        golsContra: yup.number().integer(),
        cartoesAmarelos: yup.number().integer(),
        cartoesVermelhos: yup.number().integer()
    }))
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    const result = await ClubeCampeonatoProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}