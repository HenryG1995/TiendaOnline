create table LISTADO_ZONAS
(
    CODIGO_ZONA VARCHAR2(36) default SYS_GUID() not null
        constraint PK_CODIGO_ZONA
            primary key,
    ZONA        NUMBER,
    DESCRIPCION VARCHAR2(100)
)
/

