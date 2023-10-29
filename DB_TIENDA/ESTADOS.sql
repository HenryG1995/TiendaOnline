create table ESTADOS
(
    CODIGO_ESTADO VARCHAR2(36) default SYS_GUID() not null
        constraint PK_CODIGO_ESTADO
            primary key,
    ESTADO        VARCHAR2(100),
    ACTIVO        NUMBER(1)                       not null
)
/

