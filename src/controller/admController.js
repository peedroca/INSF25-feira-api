import * as repo from "../repository/admRepository.js";
import { Router } from "express";

const endpoints = Router();

// Função para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Inserir novo administrador
endpoints.post('/adm', async (req, resp) => {
  try {
    const novo = req.body;

    // Validações
    if (!novo.email || !validarEmail(novo.email)) {
      return resp.status(400).send({ erro: "E-mail inválido. Digite no formato correto (ex: exemplo@email.com)." });
    }

    if (!novo.senha || typeof novo.senha !== "string" || novo.senha.trim() === "") {
      return resp.status(400).send({ erro: "Senha é obrigatória e deve ser texto." });
    }

    const id = await repo.inserirAdm(novo);
    resp.status(201).send({ novoId: id });

  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao inserir administrador." });
  }
});

// Listar administradores
endpoints.get('/adm', async (req, resp) => {
  try {
    const registros = await repo.listarAdm();
    resp.status(200).send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao listar administradores." });
  }
});

export default endpoints;
