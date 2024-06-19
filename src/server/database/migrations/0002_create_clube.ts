import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.clube, table => {
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().checkLength('>=', 3);
        table.string('mascote').notNullable().checkLength('>=', 3);
        table.string('cor_principal').notNullable()
        table.string('cor_secundaria').notNullable()

        table.bigInteger('usuarioId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.usuario)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

        table.comment('Tabela usada para armazenar os clubes do sistema')
    })
    .then(() => {
        console.log(`# Created table ${ETableNames.clube}`)
    })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.clube)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.clube}`)
        })
}