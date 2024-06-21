import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogo } from "../../models/Jogos";

export const getById = async (id: number): Promise<IJogo | Error> => {
    try {
        const result = await Knex(ETableNames.jogos)
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