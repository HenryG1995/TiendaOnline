create table USUARIOS
(
    CODIGO_USUARIO VARCHAR2(36 char) default SYS_GUID() not null
        constraint CODIGO_USUARIO_PK
            primary key,
    USER_ID        VARCHAR2(100 char)
        unique,
    PASSWORD_USER  VARCHAR2(100 char),
    CORREO         VARCHAR2(100 char)
        constraint CORREO_CHECK
            check (INSTR(CORREO, '@') > 0),
    ESTADO         VARCHAR2(36)      default null
)
/

