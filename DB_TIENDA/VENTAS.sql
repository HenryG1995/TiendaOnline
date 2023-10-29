create table VENTAS
(
    CODIGO_VENTA        VARCHAR2(36) default SYS_GUID() not null
        constraint PK_CODIGO_VENTA
            primary key,
    CODIGO_CLIENTE      VARCHAR2(36)
        references CLIENTE,
    FECHA_VENTA         DATE,
    ESTADO              VARCHAR2(36)
        references ESTADOS,
    APLICA_NOTA         NUMBER(1),
    CODIGO_NOTA         VARCHAR2(36)
        references NOTAS_CREDITO,
    FECHA_ENTREGA       DATE,
    FECHA_ACTUALIZACION TIMESTAMP(7)                    not null
)
/

