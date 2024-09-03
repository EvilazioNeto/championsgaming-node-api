import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPasswordReset } from "../../models/PasswordReset";

export const getByToken = async (token: string): Promise<IPasswordReset | Error> => {
    try {
        const reset = await Knex(ETableNames.passwordReset)
            .where('token', '=', token)
            .andWhere('expires_at', '>', new Date())
            .first();

        if (!reset) {
            return new Error('Token não encontrado ou expirado.');
        }

        return reset;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao buscar token.');
    }
};
