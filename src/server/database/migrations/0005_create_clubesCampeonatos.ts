import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.campeonatos, table => {
        table.bigIncrements('id').primary().index();
        

        table.bigInteger('usuarioId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.usuario)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');


        table.comment('Tabela usada para armazenar as informações dos clubes nos campeonatos no sistema')
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