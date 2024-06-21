import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.jogadoresJogos, table => {
        table.bigIncrements('id').primary().index();
        table.integer('gols').notNullable().defaultTo(0)
        table.integer('assistencias').notNullable().defaultTo(0);
        table.integer('cartaoAmarelo').notNullable().defaultTo(0)
        table.integer('cartaoVermelho').notNullable().defaultTo(0)

        table.bigInteger('jogoId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.jogos)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.bigInteger('jogadorId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.jogadores)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.comment('Tabela usada para armazenar as estatísticas dos jogadores nos jogos')
    })
        .then(() => {
            console.log(`# Created table ${ETableNames.jogadoresJogos}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.jogadoresJogos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.jogadoresJogos}`)
        })
}