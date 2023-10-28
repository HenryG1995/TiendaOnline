using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.PARAM
{
    public class VENTALIST
    {
        public string CODIGO_CLIENTE { get; set; }//NOTA esto solo se recibe la primera vez para llenar el objeto de la clase ventas
        public DateTime FECHA_ENTREGA { get; set; }//NOTA esto solo se recibe la primera vez para llenar el objeto de la clase ventas
        public string ESTADO { get; set; }//NOTA esto solo se recibe la primera vez para llenar el objeto de la clase ventas
        public Int32 APLICA_NOTA { get; set; }//NOTA esto solo se recibe la primera vez para llenar el objeto de la clase ventas
        public string CODIGO_NOTA { get; set; }//NOTA esto solo se recibe la primera vez para llenar el objeto de la clase ventas
        public string? CODIGO_PRODUCTO { get; set; }//NOTA esto se recibe por cada item
        public Int64? CANTIDAD {  get; set; }//NOTA esto se recibe por cada item

    }
}
