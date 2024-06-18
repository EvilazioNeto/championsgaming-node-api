import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.posicoes, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 50).checkLength('<=', 50).index().notNullable();
            table.comment('Tabela usada para armazenar posicoes dos jogadores do sistema')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.posicoes}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.posicoes)
        .then(()=>{
            console.log(`# Dropped table ${ETableNames.posicoes}`)
        })
}