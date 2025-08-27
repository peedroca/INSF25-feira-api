import * as repo from "../repository/visitantesRepository.js";
import { Router } from "express";

const endpoints = Router();



function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.trim() === email;
}

function validarCPF(cpf) {
  const regex = /^\d{11}$/; // exatamente 11 números
  return regex.test(cpf);
}

function validarTelefone(telefone) {
  const regex = /^\d{8,15}$/; // entre 8 e 15 números
  return regex.test(telefone);
}

function validarNome(nome) {
  return (
    typeof nome === "string" &&
    nome.trim().length >= 2 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome.trim())
  );
}

function validarIdade(idade) {
  return Number.isInteger(Number(idade)) && Number(idade) > 0;
}




// Listar todos os visitantes
endpoints.get("/visitantes", async (req, resp) => {
  try {
    const registros = await repo.listarVisitantes();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao listar visitantes." });
  }
});

// Filtrar visitante por nome
endpoints.get("/visitantes/nome/:nome", async (req, resp) => {
  try {
    const nome = req.params.nome;
    const visitante = await repo.filtrarPorNome(nome);

    if (!visitante || visitante.length === 0) {
      return resp
        .status(404)
        .send({ erro: "Nenhum visitante encontrado com esse nome." });
    }

    resp.send(visitante);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao buscar visitante por nome." });
  }
});

// Filtrar visitante por CPF
endpoints.get("/visitantes/cpf/:cpf", async (req, resp) => {
  try {
    const cpf = req.params.cpf;

    if (!validarCPF(cpf)) {
      return resp
        .status(400)
        .send({ erro: "CPF inválido. Digite exatamente 11 números." });
    }

    const visitante = await repo.filtrarPorCpf(cpf);

    if (!visitante || visitante.length === 0) {
      return resp
        .status(404)
        .send({ erro: "Nenhum visitante encontrado com esse CPF." });
    }

    resp.send(visitante);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao buscar visitante por CPF." });
  }
});

// Inserir novo visitante
endpoints.post("/visitantes", async (req, resp) => {
  try {
    const novo = req.body;

    if (!validarNome(novo.nm_cadastrado)) {
      return resp
        .status(400)
        .send({
          erro: "Nome inválido. Deve ter pelo menos 2 letras e conter apenas letras e espaços.",
        });
    }

    if (!validarIdade(novo.idade_cadastrado)) {
      return resp
        .status(400)
        .send({ erro: "Idade inválida. Digite um número inteiro maior que 0." });
    }

    if (!novo.cpf_cadastrado || !validarCPF(String(novo.cpf_cadastrado))) {
      return resp
        .status(400)
        .send({ erro: "CPF inválido. Deve conter exatamente 11 números." });
    }

    if (novo.email_cadastrado && !validarEmail(novo.email_cadastrado)) {
      return resp
        .status(400)
        .send({
          erro: "E-mail inválido. Digite no formato correto (ex: exemplo@email.com).",
        });
    }

    if (novo.telefone_numero && !validarTelefone(String(novo.telefone_numero))) {
      return resp
        .status(400)
        .send({
          erro: "Telefone inválido. Deve conter apenas números (8 a 15 dígitos).",
        });
    }

    const id = await repo.inserirVisitante(novo);
    resp.status(201).send({ novoId: id });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao inserir visitante." });
  }
});

// Alterar visitante
endpoints.put("/visitantes/:id", async (req, resp) => {
  try {
    const id = Number(req.params.id);
    const novosDados = req.body;

    if (isNaN(id) || id <= 0) {
      return resp.status(400).send({ erro: "ID inválido." });
    }

    if (novosDados.nm_cadastrado && !validarNome(novosDados.nm_cadastrado)) {
      return resp
        .status(400)
        .send({
          erro: "Nome inválido. Deve ter pelo menos 2 letras e conter apenas letras e espaços.",
        });
    }

    if (novosDados.idade_cadastrado && !validarIdade(novosDados.idade_cadastrado)) {
      return resp
        .status(400)
        .send({ erro: "Idade inválida. Digite um número inteiro maior que 0." });
    }

    if (novosDados.cpf_cadastrado && !validarCPF(String(novosDados.cpf_cadastrado))) {
      return resp
        .status(400)
        .send({ erro: "CPF inválido. Deve conter exatamente 11 números." });
    }

    if (novosDados.email_cadastrado && !validarEmail(novosDados.email_cadastrado)) {
      return resp.status(400).send({ erro: "E-mail inválido." });
    }

    if (
      novosDados.telefone_numero &&
      !validarTelefone(String(novosDados.telefone_numero))
    ) {
      return resp
        .status(400)
        .send({
          erro: "Telefone inválido. Deve conter apenas números (8 a 15 dígitos).",
        });
    }

    await repo.alterarVisitante(id, novosDados);
    resp.send({ message: "Visitante alterado com sucesso" });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao alterar visitante." });
  }
});


export default endpoints;
