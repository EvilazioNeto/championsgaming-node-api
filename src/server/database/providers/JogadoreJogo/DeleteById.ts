import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.jogadoresJogos)
            .where('id', '=', id)
            .del()

        if(result > 0) return;
        
        return new Error('Erro ao deletar dados do jogador na partida')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao deletar dados do jogador na partida')
    }
}