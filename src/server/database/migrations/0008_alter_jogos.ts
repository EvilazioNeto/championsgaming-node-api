import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.jogos, table => {
        table.enu('tipoJogo', ['ida', 'volta']).notNullable(); 
        table.integer('rodada').notNullable(); 
    })
    .then(() => {
        console.log(`# Altered table ${ETableNames.jogos}`);
    });
}

export async function down(knex: Knex) {
    return knex.schema.table(ETableNames.jogos, table => {
        table.dropColumn('tipoJogo'); 
        table.dropColumn('rodada'); 
    })
    .then(() => {
        console.log(`# Reverted table ${ETableNames.jogos}`);
    });
}
