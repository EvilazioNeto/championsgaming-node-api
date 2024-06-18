import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PosicoesProvider } from "../../database/providers/Posicoes";


export const getAll = async (Req: Request, res: Response) => {
    const result = await PosicoesProvider.getAll()

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    // res.setHeader('x-total-count', count)

    return res.status(StatusCodes.OK).json(result)
};