create database feira_profissoes;
use feira_profissoes;

create table tb_cadastrados(
id int auto_increment primary key,
nm_cadastrado varchar(50),
idade_cadastrado int,
cpf_cadastrado varchar(11),
escolaridade_cadastrado varchar(30),
telefone_numero varchar (11),
horario_chegada time,
email_cadastrado varchar (50),
cm_conheceu varchar (50),
ex_aluno boolean,
interesse_curso boolean,
SeSim_qual varchar (30)
);

create table tb_adm(
id_adm int auto_increment primary key,
email varchar (23),
senha varchar (20)
);

create table tb_qrcode (
id_qrcode int auto_increment primary key,
id_visitante int,
numero_qrcode int);




