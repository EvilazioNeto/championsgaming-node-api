import{ Knex } from "knex";

export async function up(knex:Knex) {
    return knex.schema.table('treinadores', table => {
       table.string('fotoUrl').notNullable();
    })
    .then(() => {
        console.log(`# Altered table treinadores`);
    });
    
}

export async function down(knex:Knex) {
    return knex.schema.table('treinadores', table => {
        table.dropColumn('fotoUrl');
    })
    .then(() => {
        console.log(`# Dropped column fotoUrl from table treinadores`);
    });
}