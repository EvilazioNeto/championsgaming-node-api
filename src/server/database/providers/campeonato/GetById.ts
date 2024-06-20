import { Knex } from "../../knex"
import { ETableNames } from "../../ETableNames";
import { ICampeonato } from "../../models/Campeonato";

export const getById = async (id: number): Promise<ICampeonato | Error> => {
    try {
        const result = await Knex(ETableNames.campeonatos)
            .select('*')
            .where('id', '=', id)
            .first()


        if (result) return result

        return new Error(`Erro ao recuperar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao recuperar registro com id: ${id}`)
    }
}