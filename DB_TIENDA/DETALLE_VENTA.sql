create table DETALLE_VENTA
(
    CODIGO_VENTA    VARCHAR2(36) not null
        constraint CODIGO_VENTA_DETALLE_VENTA___FK
            references VENTAS,
    CODIGO_PRODUCTO VARCHAR2(36) not null
        constraint "CODIGO_PRODUCTO_DETALLE_VENTA___fk"
            references INVENTARIO,
    CANTIDAD        NUMBER(10),
    ESTADO          VARCHAR2(36),
    TOTAL           NUMBER(10)
)
/

