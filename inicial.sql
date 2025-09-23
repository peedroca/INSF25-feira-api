create table tb_cadastrados(
    id int auto_increment primary key,
    nm_cadastrado varchar(50),
    idade_cadastrado int,
    cpf_cadastrado varchar(11),
    escolaridade_cadastrado varchar(30),
    telefone_numero varchar(11),
    horario_chegada time,
    email_cadastrado varchar(50),
    cm_conheceu varchar(50),
    ex_aluno boolean,
    interesse_curso boolean,
    SeSim_qual varchar(30)
);

create table visitas (
    id int auto_increment primary key,
    codigo int
);

create table Vincular (
    id_vincular int auto_increment primary key,
    id_usuario int,
    id_qrcode int,
    foreign key (id_usuario) references tb_cadastrados(id),
    foreign key (id_qrcode) references visitas(id)
);
