import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogo } from "../../models/Jogos";

export const getAllByCampeonatoId = async (campeonatoId: number): Promise<IJogo[] | Error> => {
    try {
        const result = await Knex(ETableNames.jogos)
            .select('*')
            .where('campeonatoId', '=', campeonatoId)


        if (result) return result;

        return new Error(`Erro ao buscar jogos do campeonato`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar jogos do campeonato`)
    }
}