import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

const posicoesFutebol = [
    "Goleiro",
    "Zagueiro",
    "Zagueiro Direito",
    "Zagueiro Esquerdo",
    "Lateral Direito",
    "Lateral Esquerdo",
    "Volante",
    "Meia",
    "Meia Atacante",
    "Meia Defensivo",
    "Meia Direita",
    "Meia Esquerda",
    "Atacante",
    "Ponta Direita",
    "Ponta Esquerda",
    "Centroavante"
];


// export const seed = async (knex: Knex) => {
//     const [{ count }] = await knex(ETableNames.posicoes).count<[{ count: number }]>('* as count');
//     if (!Number.isInteger(count) || Number(count) > 0) return;

//     const posicoesToInsert = posicoesFutebol.map(nomeDaPosicao => ({ nome: nomeDaPosicao }));
//     await knex(ETableNames.posicoes).insert(posicoesToInsert);
// };

export const seed = async (knex: Knex) => {
    for (const nomeDaPosicao of posicoesFutebol) {
        const exists = await knex(ETableNames.posicoes).where({ nome: nomeDaPosicao }).first();
        if (!exists) {
            await knex(ETableNames.posicoes).insert({ nome: nomeDaPosicao });
        }
    }
};