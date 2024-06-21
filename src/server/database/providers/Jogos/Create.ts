import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogo } from "../../models/Jogos"

export const create = async (jogo: Omit<IJogo, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.jogos).insert(jogo).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if(typeof result === 'number'){
            return result;
        }
        
        return new Error('Erro ao criar novo jogo')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao criar novo jogo')
    }
}