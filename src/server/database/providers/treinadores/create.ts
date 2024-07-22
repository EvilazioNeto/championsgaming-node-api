import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ITreinador } from "../../models/Treinador"

export const create = async (treinador: Omit<ITreinador, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.treinadores).insert(treinador).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao criar novo treinador')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao criar novo treinador')
    }
}