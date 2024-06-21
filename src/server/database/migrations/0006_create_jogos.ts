import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.jogos, table => {
        table.bigIncrements('id').primary().index();
        table.date('dataJogo').notNullable();
        table.time('horaJogo').notNullable()
        table.integer('golClube1').notNullable().defaultTo(0);
        table.integer('golClube2').notNullable().defaultTo(0);
        table.string('localJogo').notNullable().checkLength('>=', 3);

        table.bigInteger('campeonatoId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.campeonatos)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.bigInteger('clube1Id')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.clube)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.bigInteger('clube2Id')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.clube)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');


        table.comment('Tabela usada para armazenar os jogos dos campeonatos no sistema')
    })
        .then(() => {
            console.log(`# Created table ${ETableNames.jogos}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.jogos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.jogos}`)
        })
}