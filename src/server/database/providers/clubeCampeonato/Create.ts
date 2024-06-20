import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IClubeCampeonato } from "../../models/ClubeCampeonato"

export const create = async (clubeCampeonato: Omit<IClubeCampeonato, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.clubesCampeonatos).insert(clubeCampeonato).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error(`Erro ao associar clube ao campeonato`);
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao associar clube ao campeonato`);
    }
}