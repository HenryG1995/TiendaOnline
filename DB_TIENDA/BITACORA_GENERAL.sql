create table BITACORA_GENERAL
(
    CODIGO_USUARIO VARCHAR2(36) not null
        primary key
        references USUARIOS,
    DESCRIPCION    VARCHAR2(400),
    ACCION         VARCHAR2(100),
    FECHA          TIMESTAMP(7) default SYSDATE
)
/

