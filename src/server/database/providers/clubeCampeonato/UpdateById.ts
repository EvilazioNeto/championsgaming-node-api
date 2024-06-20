import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClubeCampeonato } from "../../models/ClubeCampeonato";

export const updateById = async (id: number, clubeCampeonato: Partial<Omit<IClubeCampeonato, 'id' | 'clubeId' | 'campeonatoId'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.clubesCampeonatos)
            .update(clubeCampeonato)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro');
    }

}