import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogador } from "../../models/Jogador";

export const getAllByClubId = async (clubeId: number): Promise<IJogador[] | Error> => {
    try {
        const result = await Knex(ETableNames.jogadores)
            .select('*')
            .where('clubeId', '=', clubeId)


        if (result) return result;

        return new Error(`Erro ao buscar jogadores`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar jogadores`)
    }
}