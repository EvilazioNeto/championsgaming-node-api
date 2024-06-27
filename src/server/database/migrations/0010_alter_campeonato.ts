import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.campeonatos, table => {
        table.integer('quantidadeTimes').notNullable();
    })

    .then(() => {
        console.log(`# Altered table ${ETableNames.campeonatos}`);
    });
}

export async function down(knex: Knex) {
    return knex.schema.table(ETableNames.campeonatos, table => {
        table.dropColumn('quantidadeTimes');
    })
    .then(() => {
        console.log(`# Reverted table ${ETableNames.campeonatos}`);
    });
}
