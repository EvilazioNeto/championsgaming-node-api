import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.clubesCampeonatos, table => {
        table.bigIncrements('id').primary().index();
        table.integer('vitorias').notNullable().defaultTo(0);
        table.integer('derrotas').notNullable().defaultTo(0);
        table.integer('empates').notNullable().defaultTo(0);
        table.integer('golsPro').notNullable().defaultTo(0);
        table.integer('golsContra').notNullable().defaultTo(0);
        table.integer('cartoesAmarelos').notNullable().defaultTo(0);
        table.integer('cartoesVermelhos').notNullable().defaultTo(0);

        table.bigInteger('clubeId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.clube)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.bigInteger('campeonatoId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.campeonatos)
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