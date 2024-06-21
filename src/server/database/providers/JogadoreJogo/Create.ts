import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogadorJogo } from "../../models/JogadorJogo"

export const create = async (jogadorJogo: Omit<IJogadorJogo, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.jogadoresJogos).insert(jogadorJogo).returning('id')
    
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