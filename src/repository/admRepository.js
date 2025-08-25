import { connection } from "../../connection.js";

//inserir novo vistante 
export async function inserirAdm(novoAdm) {
    const comando = `
      INSERT INTO tb_adm (email,senha)
    VALUES (?,?)` 
  
    let [info] = await connection.query(comando, [novoAdm.email, novoAdm.senha]);
    
    return info.insertId;
  }
  
  // Listar todos os adm
export async function listarAdm() {
  const comando = `
    SELECT * 
      FROM tb_adm
  `;
  let [registros] = await connection.query(comando);
  return registros;
}