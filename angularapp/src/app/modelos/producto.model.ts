
export class ProductoModel {
    codigO_PRODUCTO: string = "";
    nombrE_PRODUCTO: string = "";
    descripcioN_PRODUCTO: string = "";
    unidadeS_EXISTENTES: number = 0;
    fechA_CARGA: Date | null = null;
    fechA_INGRESO: Date | null = null;
    uuiD_ESTADO: string = "";
    activo: number = 0;
    imagen: string = "";
    codigO_PROVEEDOR: string = "";
    caducidad: Date | null = null;
    precio: number = 0;
    descuento: number = 0;
    activA_DESCUENTO: number = 0;
}