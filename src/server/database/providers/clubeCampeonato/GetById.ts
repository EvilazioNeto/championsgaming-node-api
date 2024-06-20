import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClubeCampeonato } from "../../models/ClubeCampeonato";

export const getById = async (id: number): Promise<IClubeCampeonato | Error> => {
    try {
        const result = await Knex(ETableNames.clubesCampeonatos)
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