import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middlewares';
import { JWTService, PasswordCrypto } from '../../shared/services';
import { IUsuario } from '../../database/models/Usuario';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5).matches(/\S+@\S+\.\S+/),
    senha: yup.string().required().min(6)
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;

  const usuario = await UsuariosProvider.getByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  }

  const passordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha)
  if (!passordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  } else {
    const accessToken = JWTService.sign({ uid: usuario.id })
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }
    const user = {
      id: usuario.id,
      email: usuario.email,
    }

    return res.status(StatusCodes.OK).json({ accessToken: accessToken, user});
  }
};