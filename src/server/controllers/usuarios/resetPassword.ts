import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { PasswordResetProvider } from "../../database/providers/passwordResetProvider";
import { StatusCodes } from "http-status-codes";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";

interface IBodyProps {
    token: string;
    newPassword: string;
}

export const resetPasswordValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        token: yup.string().required(),
        newPassword: yup.string().required().min(8)
    })),
}));

export const resetPassword = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { token, newPassword } = req.body;

    const passwordReset = await PasswordResetProvider.getByToken(token);

    if (passwordReset instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Token inválido ou expirado.'
            }
        });
    }

    const usuario = await UsuariosProvider.getById(passwordReset.usuarioId);

    if (usuario instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: 'Usuário não encontrado.'
            }
        });
    }

    const hashedPassword = await PasswordCrypto.hashPassword(newPassword);

    const updateResult = await UsuariosProvider.updateById(usuario.id, { senha: hashedPassword });

    if (updateResult instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao atualizar a senha.'
            }
        });
    }

    await PasswordResetProvider.deleteById(passwordReset.id);

    return res.status(StatusCodes.OK).json({
        message: 'Senha redefinida com sucesso.'
    });
}