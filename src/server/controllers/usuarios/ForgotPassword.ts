import { Request, Response } from "express";
import { IUsuario } from "../../database/models/Usuario";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { UsuariosProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../../shared/services/emailService";
import crypto from 'crypto';
import { PasswordResetProvider } from "../../database/providers/passwordResetProvider";

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'senha'> { }

export const forgotPasswordInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5).matches(/\S+@\S+\.\S+/)
    })),
}));

export const forgotPassword = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email } = req.body;

    const usuarioExistente = await UsuariosProvider.getByEmail(email);

    if (usuarioExistente instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: 'Email não encontrado'
            }
        });
    }

    const tokenAtivo = await PasswordResetProvider.getActiveTokenByUserId(usuarioExistente.id);
    if (tokenAtivo) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Já existe um link de redefinição de senha ativo. Verifique seu e-mail.'
            }
        });
    }

    const token = crypto.randomBytes(20).toString('hex');

    await PasswordResetProvider.create({
        usuarioId: usuarioExistente.id,
        token,
        expires_at: new Date(Date.now() + 3600000),
        created_at: new Date()
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                            body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #007bff;
                        margin-top: 0;
                    }
                    p {
                        line-height: 1.6;
                        margin: 0 0 20px;
                    }
                    .footer {
                        font-size: 0.9em;
                        color: #666;
                        text-align: center;
                        margin-top: 20px;
                    }
                    .footer img{
                        display: block;
                        width: 50px;
                        margin: 0 auto;
                        margin-bottom: 5px;
                    }
                </style>
            </head>
                <body>
                    <div class="container">
                        <h1>Olá, ${usuarioExistente.nome}</h1>
                        <p>Para redefinir sua senha, clique no link abaixo:</p>
                        <a href=${resetLink}>Redefinir Senha</a>
                        <p>Este link expira em 1 hora.</p>
                        <div class="footer">
                            <img src="https://firebasestorage.googleapis.com/v0/b/reactuploads-92499.appspot.com/o/public%2Flogo-sem-fundo.png?alt=media&token=2371c662-009e-461e-ad7d-42dcbb6f03fe" alt="Champions Gaming"/>
                            Se você não solicitou a redefinição de senha, ignore este e-mail.
                        </div>
                    </div>
                </body>
    </html>
`;

    try {
        await sendEmail(
            'Champions Gaming',
            usuarioExistente.email,
            'Redefinição de Senha',
            `Olá, para redefinir sua senha, acesse o link: `,
            htmlContent
        );

        return res.status(StatusCodes.OK).json({
            message: 'Um link de redefinição de senha será enviado.'
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao enviar e-mail de redefinição de senha.'
            }
        });
    }

}