import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models/Usuario";

export const getById = async (id: number): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario)
            .select('*')
            .where('id', '=', id)
            .first();
        
        if (result) return result;

        return new Error(`Erro ao buscar usuário com id : ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao buscar usuário com id: ${id}`)
    }
}