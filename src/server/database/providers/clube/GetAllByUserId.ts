import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClube } from "../../models/Clube";

export const getAllByUserId = async (usuarioId: number): Promise<IClube[] | Error> => {
    try {
        const result = await Knex(ETableNames.clube)
            .select('*')
            .where('usuarioId', '=', usuarioId)

        return result;
    } catch (error) {
        console.error('Erro ao buscar os registros:', error);
        return new Error('Erro ao buscar os registros');
    }
};
