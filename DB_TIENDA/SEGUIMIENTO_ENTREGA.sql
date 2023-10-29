create table SEGUIMIENTO_ENTREGA
(
    CODIGO_ENTREGA VARCHAR2(36) not null
        primary key
        references ENTREGA_PRODUCTO,
    DESCRIPCION    VARCHAR2(500),
    FECHA_ENTREGA  DATE,
    FECHA_SALIDA   DATE,
    ESTADO         VARCHAR2(36)
        references ESTADOS,
    FECHA_REGISTRA TIMESTAMP(7) default SYSDATE
)
/

