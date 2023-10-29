create table INVENTARIO
(
    CODIGO_PRODUCTO      VARCHAR2(36)   default SYS_GUID()                          not null
        constraint PK_CODIGO_INVENTARIO
            primary key,
    NOMBRE_PRODUCTO      VARCHAR2(100)                                              not null,
    DESCRIPCION_PRODUCTO VARCHAR2(4000) default 'PRODUCTO PENDIENTE DE DESCRIPCION' not null,
    UNIDADES_EXISTENTES  NUMBER(10)     default 0                                   not null,
    FECHA_CARGA          DATE           default SYSDATE                             not null,
    FECHA_INGRESO        DATE           default SYSDATE                             not null,
    UUID_ESTADO          VARCHAR2(36)                                               not null,
    ACTIVO               NUMBER(10)     default 0,
    CODIGO_PROVEEDOR     VARCHAR2(36)
        references PROVEEDORES,
    CADUCIDAD            DATE,
    IMAGEN               BLOB,
    PRECIO               NUMBER(10),
    DESCUENTO            NUMBER(10),
    ACTIVA_DESCUENTO     NUMBER(10)
)
/

