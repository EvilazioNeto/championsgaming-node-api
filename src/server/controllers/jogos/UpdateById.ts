import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { JogosProvider } from "../../database/providers/Jogos";
import { IJogo } from "../../database/models/Jogos";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<IJogo, 'id'|'campeonatoId'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        dataJogo: yup.date(),
        clube1Id: yup.number().integer().moreThan(0),
        clube2Id: yup.number().integer().moreThan(0),
        golClube1: yup.number(),
        golClube2: yup.number(),
        horaJogo: yup.string(),
        localJogo: yup.string(),
        rodada: yup.number(),
        tipoJogo: yup.string()
    }))
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
 
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    const result = await JogosProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}