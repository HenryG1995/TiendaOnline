create table LISTADO_PAIS
(
    CODIGO_PAIS VARCHAR2(36) default SYS_GUID() not null
        constraint "LISTADO_PAIS_pk"
            primary key,
    PAIS        VARCHAR2(100)                   not null,
    DESCRIPCION VARCHAR2(400)
)
/

