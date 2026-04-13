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

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
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

export const noticia_tag = sqliteTable('noticia_tag', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  noticia_id: integer('noticia_id').references(() => noticias.id).notNull(),
  tag_id: integer('tag_id').references(() => tags.id).notNull(),
});
