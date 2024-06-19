import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClube } from "../../models/Clube";

export const create = async (clube: Omit<IClube, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.clube).insert(clube).returning('id');
        
        if (typeof result === 'object') {
            return result.id
        } else if(typeof result === 'number'){
            return result;
        }
        
        return new Error('Não foi possível criar o clube');
    } catch (error) {
        console.log(error)
        return new Error('Não foi possível criar o clube');
    }
}