import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ITreinador } from "../../models/Treinador";

export const getAllByCoachId = async (treinadorId: number): Promise<ITreinador[] | Error> => {
    try {
        const result = await Knex(ETableNames.treinadores)
            .select('*')
            .where('treinadorId', '=', treinadorId)

        
        if (result) return result;

        return new Error(`Erro ao buscar treinadores`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar treinadores`)
    }
}