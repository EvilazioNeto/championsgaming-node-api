import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.campeonatos, table => {
        table.integer('quantidadeTimes').notNullable();
        table.integer('numeroRodadas').notNullable(); 
        table.enu('status', ['ativo', 'encerrado', 'em_andamento']).notNullable();
    })

    .then(() => {
        console.log(`# Altered table ${ETableNames.campeonatos}`);
    });
}

export async function down(knex: Knex) {
    return knex.schema.table(ETableNames.campeonatos, table => {
        table.dropColumn('quantidadeTimes');
        table.dropColumn('numeroRodadas');
        table.dropColumn('status');
    })
    .then(() => {
        console.log(`# Reverted table ${ETableNames.campeonatos}`);
    });
}
