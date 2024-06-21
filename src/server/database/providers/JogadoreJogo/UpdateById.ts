import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogadorJogo } from "../../models/JogadorJogo";

export const updateById = async (id: number, JogadorJogo: Partial<Omit<IJogadorJogo, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.jogadoresJogos)
            .update(JogadorJogo)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error(`Erro ao atualizar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao atualizar registro com id: ${id}`)
    }
}