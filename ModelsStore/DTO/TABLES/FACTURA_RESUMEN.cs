using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class FACTURA_RESUMEN
    {

        string CODIGO_VENTA { get; set; }
        int NO_ITEM { get; set; }
        string CODIGO_PRODUCTO { get; set; }
        string CODIGO_PRECIO { get; set; }
        int CANTIDAD { get; set; }
        int TOTAL { get; set; }
        double FECHA_EMISION { get; set; }

    }
}
