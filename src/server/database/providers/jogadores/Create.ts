import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogador } from "../../models/Jogador"

export const create = async (jogador: Omit<IJogador, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.jogadores).insert(jogador).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if(typeof result === 'number'){
            return result;
        }
        
        return new Error('Erro ao criar novo jogador')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao criar novo jogador')
    }
}