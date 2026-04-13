import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { eq, asc, desc } from 'drizzle-orm';
import inquirer from 'inquirer';
import * as schema from './db/schema';

const sqlite = new Database('banco.db');
const db = drizzle(sqlite, { schema });

async function main() {
  const { opcao } = await inquirer.prompt([{
    type: 'list',
    loop: false,
    name: 'opcao',
    message: 'Menu Principal:',
    choices: [
      { name: '0 - Cadastrar notícia', value: 0 },
      { name: '1 - Exibir notícias (Mais recentes)', value: 1 },
      { name: '2 - Exibir notícias (Mais antigas)', value: 2 },
      { name: '3 - Notícias por estado', value: 3 },
      { name: '4 - Notícias agrupadas por estado', value: 4 },
      { name: '5 - Cadastrar UF', value: 5 },
      { name: '6 - Cadastrar cidade', value: 6 },
      { name: '7 - Cadastrar TAG', value: 7 },
      { name: '8 - Sair', value: 8 },
    ]
  }]);

  switch (opcao) {
    case 0: await cadastrarNoticia(); break;
    case 1: await listarNoticias(desc(schema.noticias.data_criacao)); break;
    case 2: await listarNoticias(asc(schema.noticias.data_criacao)); break;
    case 3: await listarNoticiasPorEstado(); break;
    case 4: await listarAgrupado(); break;
    case 5: await cadastrarUF(); break;
    case 6: await cadastrarCidade(); break;
    case 7: await cadastrarTag(); break;
    case 8: process.exit();
  }
  main(); // Volta ao menu
}

async function listarNoticias(ordem: any) {
  const todasNoticias = await db.select().from(schema.noticias).orderBy(ordem);
  todasNoticias.forEach((n, i) => {
    console.log(`${i + 1} - ${n.titulo}`);
  });

  await inquirer.prompt([{
    type: 'list', name: 'voltar', message: 'Ação:', choices: [{ name: '(z) Voltar', value: 'z' }]
  }]);
}

async function listarNoticiasPorEstado() {
  const todasUfs = await db.select().from(schema.ufs);
  if (todasUfs.length === 0) {
    console.log("⚠️ Nenhuma UF cadastrada no banco de dados.");
    return;
  }
  
  const { uf_id } = await inquirer.prompt([{
    type: 'list', loop: false, name: 'uf_id', message: 'Qual estado (UF) deseja consultar?',
    choices: todasUfs.map(u => ({ name: u.sigla, value: u.id }))
  }]);

  const { acao } = await inquirer.prompt([{
    type: 'list', loop: false, name: 'acao', message: 'Opções de ordenação:',
    choices: [
      { name: '(a) Ordenar por mais recentes', value: 'a' },
      { name: '(b) Ordenar por mais antigas', value: 'b' },
      { name: '(z) Voltar', value: 'z' }
    ]
  }]);

  if (acao === 'z') return;

  const ordem = acao === 'a' ? desc(schema.noticias.data_criacao) : asc(schema.noticias.data_criacao);

  const noticiasDoEstado = await db.select({
    titulo: schema.noticias.titulo,
    cidade: schema.cidades.nome,
  })
  .from(schema.noticias)
  .innerJoin(schema.cidades, eq(schema.noticias.cidade_id, schema.cidades.id))
  .where(eq(schema.cidades.uf_id, uf_id))
  .orderBy(ordem);

  noticiasDoEstado.forEach((n, i) => {
    console.log(`${i + 1} - ${n.titulo} - ${n.cidade}`);
  });

  await inquirer.prompt([{
    type: 'list', name: 'voltar', message: 'Ação:', choices: [{ name: '(z) Voltar', value: 'z' }]
  }]);
}

async function cadastrarUF() {
  const res = await inquirer.prompt([
    { name: 'nome', message: 'Nome do Estado:' },
    { name: 'sigla', message: 'Sigla (Ex: SP):' }
  ]);
  await db.insert(schema.ufs).values(res);
  console.log("UF cadastrada!");
}

async function cadastrarCidade() {
  const todasUfs = await db.select().from(schema.ufs);
  
  if (todasUfs.length === 0) {
    console.log("⚠️ Nenhuma UF cadastrada no banco de dados! Por favor, cadastre uma UF primeiro (Opção 5).");
    return;
  }

  const res = await inquirer.prompt([
    { name: 'nome', message: 'Nome da Cidade:' },
    { 
      type: 'list', 
      loop: false,
      name: 'uf_id', 
      message: 'Selecione a UF:', 
      choices: todasUfs.map(u => ({ name: u.sigla, value: u.id })) 
    }
  ]);
  await db.insert(schema.cidades).values(res);
  console.log("Cidade cadastrada!");
}

async function cadastrarTag() {
  const res = await inquirer.prompt([
    { name: 'nome', message: 'Nome da TAG:' }
  ]);
  await db.insert(schema.tags).values(res);
  console.log("TAG cadastrada!");
}

async function cadastrarNoticia() {
  const cidades = await db.select({
    id: schema.cidades.id,
    nome: schema.cidades.nome,
    uf: schema.ufs.sigla
  })
  .from(schema.cidades)
  .innerJoin(schema.ufs, eq(schema.cidades.uf_id, schema.ufs.id));
  
  if (cidades.length === 0) {
    console.log("⚠️ Nenhuma cidade cadastrada no banco de dados! Por favor, cadastre uma Cidade primeiro (Opção 6).");
    return;
  }
  
  const tags = await db.select().from(schema.tags);

  const res = await inquirer.prompt([
    { name: 'titulo', message: 'Título:' },
    { name: 'texto', message: 'Texto:' },
    { 
      type: 'list', 
      loop: false,
      name: 'cidade_id', 
      message: 'Selecione a Cidade:', 
      choices: cidades.map(c => ({ name: `${c.nome} - ${c.uf}`, value: c.id })) 
    }
  ]);
  
  const inseridos = await db.insert(schema.noticias).values(res).returning({ id: schema.noticias.id });
  const noticiaId = inseridos[0].id;
  
  if (tags.length > 0) {
    const { tagsSelecionadas } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'tagsSelecionadas',
        message: 'Selecione as TAGs para esta notícia (Opcional):',
        choices: tags.map(t => ({ name: t.nome, value: t.id }))
      }
    ]);
    
    if (tagsSelecionadas && tagsSelecionadas.length > 0) {
      for (const tagId of tagsSelecionadas) {
        await db.insert(schema.noticia_tag).values({
          noticia_id: noticiaId,
          tag_id: tagId
        });
      }
    }
  }

  console.log("Notícia cadastrada!");
}

async function listarAgrupado() {
  console.log("\n--- LISTA AGRUPADA POR ESTADOS ---");
  const dados = await db.select({
    id: schema.noticias.id,
    titulo: schema.noticias.titulo,
    texto: schema.noticias.texto,
    cidade: schema.cidades.nome,
    uf: schema.ufs.sigla
  })
  .from(schema.noticias)
  .innerJoin(schema.cidades, eq(schema.noticias.cidade_id, schema.cidades.id))
  .innerJoin(schema.ufs, eq(schema.cidades.uf_id, schema.ufs.id))
  .orderBy(schema.ufs.sigla);

  let atualUF = "";
  dados.forEach((n, i) => {
    if (n.uf !== atualUF) {
      console.log(`\n# ${n.uf}`);
      atualUF = n.uf;
    }
    console.log(`${i + 1} - ${n.titulo} - ${n.cidade}`);
  });
  console.log("");
  
  let voltar = false;
  while(!voltar) {
    const { acao } = await inquirer.prompt([{
      type: 'list', loop: false, name: 'acao', message: 'Ação:', choices: [
        { name: '(d) Detalhar notícia', value: 'd' },
        { name: '(z) Voltar', value: 'z' }
      ]
    }]);

    if (acao === 'd') {
      const { num } = await inquirer.prompt([{ name: 'num', message: 'Informe o número da notícia:' }]);
      const selecionada = dados[parseInt(num) - 1];
      if (selecionada) {
        // Buscar tags da notícia
        const tagsDaNoticia = await db.select({ nome: schema.tags.nome })
          .from(schema.noticia_tag)
          .innerJoin(schema.tags, eq(schema.noticia_tag.tag_id, schema.tags.id))
          .where(eq(schema.noticia_tag.noticia_id, selecionada.id));
        
        const tagsNomes = tagsDaNoticia.map(t => t.nome).join(', ');
        
        console.log(`\nTítulo: ${selecionada.titulo}`);
        console.log(`Texto : ${selecionada.texto}`);
        console.log(`TAGs  : ${tagsNomes ? tagsNomes : 'Nenhuma'}\n`);
      } else {
        console.log('Notícia não encontrada.\n');
      }
    } else if (acao === 'z') {
      voltar = true;
    }
  }
}

main();
