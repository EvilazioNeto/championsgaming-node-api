import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogadorJogo } from "../../models/JogadorJogo";

export const getAllByJogadorId = async (jogadorId: number): Promise<IJogadorJogo[] | Error> => {
    try {
        const result = await Knex(ETableNames.jogadoresJogos)
            .select('*')
            .where('jogadorId', '=', jogadorId)


        if (result) return result;

        return new Error(`Erro ao buscar info do jogador na partida`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar info do jogador na partida`)
    }
}