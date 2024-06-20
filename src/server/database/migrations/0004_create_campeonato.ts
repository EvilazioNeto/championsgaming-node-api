import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.campeonatos, table => {
        table.bigIncrements('id').primary().index();
        table.string('nome', 100).checkLength('<=', 100).index().notNullable();
        table.date('dataInicio').notNullable();
        table.date('dataFim').notNullable();

        table.bigInteger('usuarioId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.usuario)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');


        table.comment('Tabela usada para armazenar os campeonatos no sistema')
    })
        .then(() => {
            console.log(`# Created table ${ETableNames.campeonatos}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.campeonatos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.campeonatos}`)
        })
}