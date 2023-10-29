create table ENTREGA_PRODUCTO
(
    CODIGO_ENTREGA VARCHAR2(36) default SYS_GUID() not null
        primary key,
    CODIGO_VENTA   VARCHAR2(36)
        references VENTAS,
    DESCRIPCION    VARCHAR2(400),
    DIRECCION      VARCHAR2(500),
    COORDENADAS    VARCHAR2(1000)
)
/

