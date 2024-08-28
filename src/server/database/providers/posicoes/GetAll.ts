import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPosicao } from "../../models/Posicao";

export const getAll = async (): Promise<IPosicao[] | Error> => {
    try {
        const result = await Knex(ETableNames.posicoes)
            .select('*')

        return result;
    } catch (error) {
        console.error('Erro ao buscar os registros:', error);
        return new Error('Erro ao buscar os registros');
    }
}