import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICampeonato } from "../../models/Campeonato";

export const updateById = async (id: number, campeonato: Partial<Omit<ICampeonato, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.campeonatos)
            .update(campeonato)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro');
    }
}