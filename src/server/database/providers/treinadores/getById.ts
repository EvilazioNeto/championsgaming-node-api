import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ITreinador } from "../../models/Treinador";

export const getById = async (id: number): Promise<ITreinador | Error> => {
    try {
        const result = await Knex(ETableNames.treinadores)
            .select('*')
            .where('id', '=', id)
            .first();

        
        if (result) return result;

        return new Error(`Erro ao buscar treinadores com id : ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar treinadores com id: ${id}`)
    }
}