import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPosicao } from "../../models/Posicao";

export const getById = async (id: number): Promise<IPosicao | Error> => {
    try {
        const result = await Knex(ETableNames.posicoes)
            .select('*') 
            .where('id', '=', id)
            .first();

        if (result) return result;
         
        return new Error(`Erro ao buscar registro com ID ${id}`);
    } catch (error) {
        console.error(`Erro ao buscar registro com ID ${id}:`, error);
        return new Error(`Erro ao buscar registro com ID ${id}`);
    }
};