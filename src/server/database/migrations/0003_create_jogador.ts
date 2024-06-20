import { ETableNames } from "../ETableNames";
import type { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.jogadores, table => {
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().checkLength('>=', 3);
        table.date('dataNascimento').notNullable();
        table.string('nacionalidade').notNullable();
        table.integer('numeroCamisa').notNullable().checkBetween([1, 99]);

        table.bigInteger('clubeId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.clube)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.bigInteger('posicaoId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.posicoes)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        table.comment('Tabela usada para armazenar os jogadores do sistema')
    })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.jogadores)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.jogadores}`)
        })
}

