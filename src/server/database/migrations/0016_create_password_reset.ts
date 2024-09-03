import { ETableNames } from "../ETableNames";
import type { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.passwordReset, table => {
        table.bigIncrements('id').primary().index();
        table.string('token').notNullable();
        table.timestamp('expires_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.bigInteger('usuarioId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.usuario)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.comment('Tabela usada para armazenar o token para redefinir senha');
    })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.passwordReset)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.passwordReset}`)
        })
}