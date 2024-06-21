import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { JogadorJogoProvider } from "../../database/providers/JogadoreJogo";
import { IJogadorJogo } from "../../database/models/JogadorJogo";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<IJogadorJogo, 'id' | 'jogadorId' | 'jogoId'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        gols: yup.number().integer().required(),
        assistencias: yup.number().integer().required(),
        cartaoAmarelo: yup.number().integer().required(),
        cartaoVermelho: yup.number().integer().required()
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
    const result = await JogadorJogoProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}