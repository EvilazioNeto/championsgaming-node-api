import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IClube } from "../../models/Clube";

export const getAll = async (page: number, limit: number, filter: string): Promise<IClube[] | Error> => {
    try {
        const result = await Knex(ETableNames.clube)
            .select('*')
            .where('nome', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        return result;
    } catch (error) {
        console.error('Erro ao buscar os registros:', error);
        return new Error('Erro ao buscar os registros');
    }
}