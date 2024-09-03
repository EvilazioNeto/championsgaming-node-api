import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPasswordReset } from "../../models/PasswordReset";

export const create = async (data: Omit<IPasswordReset, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.passwordReset).insert(data).returning('id');

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao registrar o token de recuperação de senha');
    } catch (error) {
        console.log(error)
        return new Error('Erro ao registrar o token de recuperação de senha');
    }
}