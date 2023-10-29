create table CATALOGO_CATEGORIAS
(
    CODIGO_CATEGORIA VARCHAR2(36) default SYS_GUID() not null
        constraint PK_CODIGO_CATEGORIA
            primary key,
    NOMBRE_CATEGORIA VARCHAR2(50)                    not null,
    ACTIVO           NUMBER(1)                       not null
)
/

