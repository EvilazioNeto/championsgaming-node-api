import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models/Usuario";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario)
            .select('*')
            .where('email', '=', email)
            .first();

        if (result) return result;
         
        return new Error(`Erro ao buscar registro com email ${email}`);
    } catch (error) {
        console.error(`Erro ao buscar registro com email ${email}:`, error);
        return new Error(`Erro ao buscar registro com email ${email}`);
    }
};
