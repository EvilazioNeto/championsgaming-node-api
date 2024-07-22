import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { TreinadoresProvider } from "../../database/providers/treinadores";
import { ITreinador } from "../../database/models/Treinador";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<ITreinador, 'id'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3).max(100),
        clubeId: yup.number().integer().moreThan(0),
        dataNascimento: yup.date(),
        nacionalidade: yup.string().max(100),
        fotoUrl: yup.string().url().max(255),
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
    const result = await TreinadoresProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}