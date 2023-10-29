create table LISTADO_DEPARTAMENTOS
(
    CODIGO_DEPARTAMENTO VARCHAR2(36) default SYS_GUID() not null
        constraint "LISTADO_DEPARTAMENTOS_pk"
            primary key,
    DEPARTAMENTO        VARCHAR2(100)                   not null,
    DESCRIPCION         VARCHAR2(400)
)
/

