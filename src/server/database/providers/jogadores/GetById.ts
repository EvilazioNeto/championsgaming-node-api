import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogador } from "../../models/Jogador";

export const getById = async (id: number): Promise<IJogador | Error> => {
    try {
        const result = await Knex(ETableNames.jogadores)
            .select('*')
            .where('id', '=', id)
            .first();


        if (result) return result;

        return new Error(`Erro ao buscar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar registro com id: ${id}`)
    }
}