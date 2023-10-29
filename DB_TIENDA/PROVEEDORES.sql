create table PROVEEDORES
(
    CODIGO_PROVEEDOR VARCHAR2(36) default SYS_GUID() not null
        primary key,
    NOMBRE_PROVEEDOR VARCHAR2(100)                   not null,
    ACTIVO           NUMBER(1)
)
/

