import * as repo from "../repository/VincularRepository.js";
import { Router } from "express";

const endpoints = Router();

endpoints.post("/vincular", async (req, resp) => {
  let id_usuario  = req.body.id_usuario;
  let id_qrcode = req.body.id_qrcode;
  try {
    const id_vincular = await repo.vincularUsuarioQrCode(id_usuario, id_qrcode);
    resp.status(201).send({ id_vincular });
  } 
  
  catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao vincular usuário ao QR Code." });
  }
});

endpoints.get("/vincular", async (req, resp) => {
  try {
    const registros = await repo.listarVinculos();
    resp.send(registros);
  } 
  
  catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao listar vínculos." });
  }
});

endpoints.delete("/vincular/:id_vincular", async (req, resp) => {
  const id_vincular  = req.params.id_vincular;
  try {
    await repo.removerVinculo(id_vincular);
    resp.send({ message: "Vínculo removido com sucesso." });
  } 
  
  catch (err) {
    console.error(err);
    resp.status(500).send({ erro: "Erro ao remover vínculo." });
  }
});

export default endpoints;
