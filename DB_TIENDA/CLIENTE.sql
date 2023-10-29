create table CLIENTE
(
    CODIGO_CLIENTE    VARCHAR2(36)  not null
        constraint PK_CLIENTE
            primary key
        references USUARIOS,
    PRIMER_NOMBRE     VARCHAR2(50)  not null,
    SEGUNDO_NOMBRE    VARCHAR2(50),
    PRIMER_APELLIDO   VARCHAR2(50)  not null,
    SEGUNDO_APELLIDO  VARCHAR2(50),
    NIT               VARCHAR2(16),
    DIRECCION_CLIENTE VARCHAR2(100) not null,
    CODIGO_ESTADO     VARCHAR2(36)
        references ESTADOS,
    CODIGO_CATEGORIA  VARCHAR2(36)
        references CATALOGO_CATEGORIAS,
    TELEFONO          NUMBER
)
/

