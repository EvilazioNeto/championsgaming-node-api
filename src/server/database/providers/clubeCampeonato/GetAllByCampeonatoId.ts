import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClubeCampeonato } from "../../models/ClubeCampeonato";

export const getAllByCampeonatoId = async (campeonatoId: number): Promise<IClubeCampeonato[] | Error> => {
    try {
        const result = await Knex(ETableNames.clubesCampeonatos)
            .select('*')
            .where('campeonatoId', '=', campeonatoId)

        if (result) return result;

        return new Error(`Erro ao obter as informações dos clubes do campeonato`);
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao obter as informações dos clubes do campeonato`);
    }

}