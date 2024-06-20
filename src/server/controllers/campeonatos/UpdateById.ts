import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares/Validation";
import { JogadoresProvider } from "../../database/providers/jogadores";
import { IJogador } from "../../database/models/Jogador";
import { CampeonatoProvider } from "../../database/providers/campeonato";
import { ICampeonato } from "../../database/models/Campeonato";

interface IParamProps {
    id?: number
}

interface IBodyProps extends Partial<Omit<ICampeonato, 'id'>> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3),
        dataInicio: yup.date(),
        dataFim: yup.date(),
        usuarioId: yup.number().moreThan(0)
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
    const result = await CampeonatoProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result)

}