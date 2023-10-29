create table FACTURA_RESUMEN
(
    CODIGO_VENTA        VARCHAR2(36)
        references VENTAS,
    TOTAL               NUMBER(10) default 0,
    FECHA_EMISION       DATE       default SYSDATE,
    TOTAL_PRODUCTOS     NUMBER(10),
    ESTADO              VARCHAR2(36),
    FECHA_ACTUALIZACION DATE       default NULL,
    CLIENTE             VARCHAR2(200)
)
/

