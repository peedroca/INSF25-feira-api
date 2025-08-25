import { connection } from "../../connection.js";

// Listar todos os visitantes
export async function listarVisitantes() {
  const comando = `
    SELECT * 
      FROM tb_cadastrados
  `;
  let [registros] = await connection.query(comando);
  return registros;
}

// Filtrar visitante por nome
export async function filtrarPorNome(nome) {
  const comando = `
    SELECT * 
      FROM tb_cadastrados
     WHERE nm_cadastrado LIKE ?
  `;
  let [registros] = await connection.query(comando, ['%' + nome + '%']);
  return registros;
}

// Filtrar visitante por CPF
export async function filtrarPorCpf(cpf) {
  const comando = `
    SELECT *
      FROM tb_cadastrados
     WHERE cpf_cadastrado LIKE ?
  `;
  let [registros] = await connection.query(comando, ['%' + cpf + '%']);
  return registros;
}

// Inserir novo visitante
export async function inserirVisitante(novoVisitante) {
  const comando = `
    INSERT INTO tb_cadastrados (
      nm_cadastrado, idade_cadastrado, cpf_cadastrado, 
      escolaridade_cadastrado, telefone_numero, horario_chegada, 
      email_cadastrado, cm_conheceu, ex_aluno, interesse_curso, SeSim_qual
    ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `;

  let [info] = await connection.query(comando, [
    novoVisitante.nm_cadastrado,
    novoVisitante.idade_cadastrado,
    novoVisitante.cpf_cadastrado,
    novoVisitante.escolaridade_cadastrado,
    novoVisitante.telefone_numero,
    novoVisitante.horario_chegada,
    novoVisitante.email_cadastrado,
    novoVisitante.cm_conheceu,
    novoVisitante.ex_aluno,
    novoVisitante.interesse_curso,
    novoVisitante.SeSim_qual
  ]);

  return info.insertId;
}

// Alterar visitante
export async function alterarVisitante(id, novosDados) {
  const comando = `
    UPDATE tb_cadastrados
       SET nm_cadastrado = ?,
           idade_cadastrado = ?,
           cpf_cadastrado = ?,
           escolaridade_cadastrado = ?,
           telefone_numero = ?,
           horario_chegada = ?,
           email_cadastrado = ?,
           cm_conheceu = ?,
           ex_aluno = ?,
           interesse_curso = ?,
           SeSim_qual = ?
     WHERE id = ?
  `;

  let [info] = await connection.query(comando, [
    novosDados.nm_cadastrado,
    novosDados.idade_cadastrado,
    novosDados.cpf_cadastrado,
    novosDados.escolaridade_cadastrado,
    novosDados.telefone_numero,
    novosDados.horario_chegada,
    novosDados.email_cadastrado,
    novosDados.cm_conheceu,
    novosDados.ex_aluno,
    novosDados.interesse_curso,
    novosDados.SeSim_qual,
    id
  ]);

  return info;
}
