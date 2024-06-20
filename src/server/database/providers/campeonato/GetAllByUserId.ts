import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICampeonato } from "../../models/Campeonato";

export const getAllByUserId = async (usuarioId: number): Promise<ICampeonato[] | Error> => {
    try {
        const result = await Knex(ETableNames.campeonatos)
            .select('*')
            .where('usuarioId', '=', usuarioId)


        if (result) return result;

        return new Error(`Erro ao buscar campeonatos`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar campeonatos`)
    }
}