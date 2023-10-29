create table LISTADO_MUNICIPIO
(
    CODIGO_MUNICIPIO VARCHAR2(36) default SYS_GUID() not null
        constraint "LISTADO_MUNICIPIO_pk"
            primary key,
    MUNICIPIO        VARCHAR2(100)                   not null,
    DESCRIPCION      VARCHAR2(400)
)
/

