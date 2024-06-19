import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClube } from "../../models/Clube";

export const getById = async (id: number): Promise<IClube | Error> => {
    try {
        const result = await Knex(ETableNames.clube)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;
        return new Error(`Erro ao deletar registro com id: ${id}`)
    } catch (error) {
        console.log(error)
        return new Error(`Erro ao deletar registro com id: ${id}`)
    }
}