import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.table('jogadores', table => {
        table.string('fotoUrl').notNullable();
    })
        .then(() => {
            console.log(`# Altered table jogadores`);
        });

}

export async function down(knex: Knex) {
    return knex.schema.table('jogadores', table => {
        table.dropColumn('fotoUrl');
    })
        .then(() => {
            console.log(`# Dropped column fotoUrl from table jogadores`);
        });
}