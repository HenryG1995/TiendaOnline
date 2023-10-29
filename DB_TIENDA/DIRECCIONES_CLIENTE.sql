create table DIRECCIONES_CLIENTE
(
    CODIGO_CLIENTE          VARCHAR2(36) not null
        constraint PK_CODIGO_CLIENTE_DIR
            primary key,
    NO_DIR                  NUMBER generated as identity,
    "DESCRIPCION DIRECCION" VARCHAR2(100),
    ZONA                    VARCHAR2(36),
    MUNICIPIO               VARCHAR2(36),
    DEPARTAMENTO            VARCHAR2(36),
    PAIS                    VARCHAR2(36),
    NOTAS_ADICIONALES       VARCHAR2(400)
)
/

