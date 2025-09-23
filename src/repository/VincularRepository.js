import { connection } from "../../connection.js";

export async function vincularUsuarioQrCode(id_usuario, id_qrcode) {
  const comando = `
    INSERT INTO Vincular (id_usuario, id_qrcode)
    VALUES (?, ?)
  `;
  const [info] = await connection.query(comando, [id_usuario, id_qrcode]);
  return info.insertId;
}

export async function listarVinculos() {
  const comando = `
    SELECT Vincular.id_vincular, tb_cadastrados.nm_cadastrado, visitas.codigo
      FROM Vincular
      JOIN tb_cadastrados ON Vincular.id_usuario = tb_cadastrados.id
      JOIN visitas ON Vincular.id_qrcode = visitas.id
  `;
  const [registros] = await connection.query(comando);
  return registros;
}

export async function removerVinculo(id_vincular) {
  const comando = `
    DELETE FROM Vincular
     WHERE id_vincular = ?
  `;
  const [info] = await connection.query(comando, [id_vincular]);
  return info;
}
