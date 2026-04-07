import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const ufs = sqliteTable('ufs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  sigla: text('sigla').notNull(),
});

export const cidades = sqliteTable('cidades', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  uf_id: integer('uf_id').references(() => ufs.id).notNull(),
});

export const noticias = sqliteTable('noticias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  texto: text('texto').notNull(),
  cidade_id: integer('cidade_id').references(() => cidades.id).notNull(),
  data_criacao: text('data_criacao')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
