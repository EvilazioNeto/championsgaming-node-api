import { ETableNames } from "../ETableNames";
import type { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.treinadores, table => {
        table.string('fotoUrl').notNullable();
    }).then(() => {
        console.log(`# Altered table ${ETableNames.treinadores}`);
    });
}

export async function down(knex: Knex) {
    return knex.schema.table(ETableNames.treinadores, table => {
        table.dropColumn('fotoUrl');
    }).then(() => {
        console.log(`# Dropped column fotoUrl from table ${ETableNames.treinadores}`);
    });
}
