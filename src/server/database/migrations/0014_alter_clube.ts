import { Knex } from "knex";

export async function up(Knex:Knex) {
    return Knex.schema.table('clube', table => {
        table.string('fotoUrl').notNullable();
    })
    .then(() => {
        console.log(`# Altered table clubes`);
    });
    
}

export async function down(Knex:Knex) {
    return Knex.schema.table('clube', table => {
        table.dropColumn('fotoUrl');
    })
    .then(() => {
        console.log(`# Dropped column fotoUrl from table clubes`);
    });
}