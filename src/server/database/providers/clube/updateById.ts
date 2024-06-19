import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClube } from "../../models/Clube";

export const updateById = async (id: number, clube: Partial<Omit<IClube, 'id'>>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.clube)
            .update(clube)
            .where('id', '=', id)

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error)
        return new Error('Erro ao atualizar o registro');
    }

}