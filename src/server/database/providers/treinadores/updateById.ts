import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ITreinador } from "../../models/Treinador";

export const updateById = async (id: number, Treinador: Partial<Omit<ITreinador, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.treinadores)
            .update(Treinador)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error(`Erro ao atualizar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao atualizar registro com id: ${id}`)
    }
}