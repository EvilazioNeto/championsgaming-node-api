import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPasswordReset } from "../../models/PasswordReset";

export const getActiveTokenByUserId = async (usuarioId: number): Promise<IPasswordReset | null> => {
    try {
        const reset = await Knex(ETableNames.passwordReset)
            .where('usuarioId', usuarioId)
            .andWhere('expires_at', '>', new Date())
            .first();

        if (!reset) {
            return null;
        }

        return reset;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao buscar token ativo.');
    }
};
