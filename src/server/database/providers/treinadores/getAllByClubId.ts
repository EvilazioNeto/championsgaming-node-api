import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ITreinador } from "../../models/Treinador";

export const getAllByClubId = async (clubeId: number): Promise<ITreinador[] | Error> => {
    try {
        const result = await Knex(ETableNames.treinadores)
            .select('*')
            .where('clubeId', '=', clubeId)

        
        if (result) return result;

        return new Error(`Erro ao buscar treinadores`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar treinadores`)
    }
}