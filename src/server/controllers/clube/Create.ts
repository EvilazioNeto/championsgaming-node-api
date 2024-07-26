import { RequestHandler } from "express";
import { ClubeProvider } from "../../database/providers/clube";
import { validation } from "../../shared/middlewares";
import { IClube } from "../../database/models/Clube";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IClube, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        mascote: yup.string().required(),
        cor_principal: yup.string().required(),
        cor_secundaria: yup.string().required(),
        usuarioId: yup.number().required().moreThan(0),
        fotoUrl: yup.string().url().required().max(255),
    })),
}))

export const create: RequestHandler = async (req, res) => {
    const result = await ClubeProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
}