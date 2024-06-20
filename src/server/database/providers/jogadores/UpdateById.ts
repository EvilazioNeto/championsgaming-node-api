import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogador } from "../../models/Jogador";

export const updateById = async (id: number, Jogador: Partial<Omit<IJogador, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.jogadores)
            .update(Jogador)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error(`Erro ao atualizar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao atualizar registro com id: ${id}`)
    }
}