import { Knex } from "../../knex"
import { ETableNames } from "../../ETableNames";
import { ICampeonato } from "../../models/Campeonato";

export const create = async (campeonato: Omit<ICampeonato, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.campeonatos).insert(campeonato).returning('id');

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }

        return new Error('Não foi possível criar o campeonato');
    } catch (error) {
        console.log(error)
        return new Error('Não foi possível criar o campeonato');
    }
}