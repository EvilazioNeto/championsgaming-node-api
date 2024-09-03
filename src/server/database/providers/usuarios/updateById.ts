import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models/Usuario";

export const updateById = async (id: number, usuario: Partial<Omit<IUsuario, 'id'>>): Promise<void | Error> => {
    try {
        if (Object.keys(usuario).length === 0) {
            return new Error('Nenhum dado para atualizar.');
        }

        const result = await Knex(ETableNames.usuario)
            .update(usuario)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error(`Erro ao atualizar usuário registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao atualizar usuário registro com id: ${id}`)
    }
}