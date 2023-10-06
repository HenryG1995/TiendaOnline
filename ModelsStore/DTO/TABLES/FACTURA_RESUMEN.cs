using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class FACTURA_RESUMEN
    {

        public string CODIGO_VENTA { get; set; }
        public Int32 NO_ITEM { get; set; }
        public string CODIGO_PRODUCTO { get; set; }
        public string CODIGO_PRECIO { get; set; }
        public Int64 CANTIDAD { get; set; }
        public Int64 TOTAL { get; set; }
        public DateTime FECHA_EMISION { get; set; }

    }
}
