create table PRECIOS
(
    CODIGO_PRODUCTO VARCHAR2(36) not null
        primary key
        references INVENTARIO,
    PRECIO          NUMBER(8, 2) default 0.0,
    DESCUENTO       NUMBER(10)   default 0,
    ACTIVO          NUMBER(1)
)
/

