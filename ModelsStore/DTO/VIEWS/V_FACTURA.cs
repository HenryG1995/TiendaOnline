using ModelsStore.DTO.TABLES;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.VIEWS
{
    public class V_FACTURA
    {
        public string CODIGO_VENTA { get; set; }
        public string CODIGO_CLIENTE { get; set; }
        public string ESTADO { get; set; }
        public string DESCRIPCION_GENERAL { get; set; }
        public float TOTAL { get; set; }
        public string CODIGO_ENTREGA { get; set; }
        public string DESCRIPCION { get; set; }
        public string DIRECCION { get; set; }
        public DateTime FECHA_EMISION { get; set; }

    }
}
