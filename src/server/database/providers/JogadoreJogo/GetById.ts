import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogadorJogo } from "../../models/JogadorJogo";

export const getById = async (id: number): Promise<IJogadorJogo | Error> => {
    try {
        const result = await Knex(ETableNames.jogadoresJogos)
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