create table NOTAS_CREDITO
(
    CODIGO_NOTA      VARCHAR2(36) default SYS_GUID() not null
        primary key,
    VALOR_NOTA       NUMBER(10)   default 0,
    DESCRIPCION_NOTA VARCHAR2(400)                   not null
)
/

