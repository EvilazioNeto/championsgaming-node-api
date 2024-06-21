import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IJogo } from "../../models/Jogos";

export const updateById = async (id: number, jogo: Partial<Omit<IJogo, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.jogos)
            .update(jogo)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error(`Erro ao atualizar jogo registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao atualizar jogo registro com id: ${id}`)
    }
}