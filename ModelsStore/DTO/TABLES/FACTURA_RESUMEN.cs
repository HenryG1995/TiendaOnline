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
        public int NO_ITEM { get; set; }
        public string CODIGO_PRODUCTO { get; set; }
        public string CODIGO_PRECIO { get; set; }
        public int CANTIDAD { get; set; }
        public int TOTAL { get; set; }
        public double FECHA_EMISION { get; set; }

    }
}
