export class ventaModelo {
    codigO_CLIENTE: string = ''
    fechA_ENTREGA: Date = new Date
    estado: string = ''
    aplicA_NOTA: number = 0
    codigO_NOTA: string = ''
    codigO_PRODUCTO: string = ''
    cantidad: number = 0
}


export interface bitacoraModelo {
    codigO_VENTA: string,
    codigO_CLIENTE: string,
    fechA_VENTA: Date,
    estado: string,
    aplicA_NOTA: number,
    codigO_NOTA: string,
    fechA_ENTREGA: Date,
    fechA_ACTUALIZACION: Date
}
