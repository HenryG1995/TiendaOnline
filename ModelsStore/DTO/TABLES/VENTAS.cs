using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    internal class VENTAS
    {
        string CODIGO_VENTA { get; set; }
        string CODIGO_CLIENTE { get; set; }
        DateTime FECHA_VENTA { get; set; }
        string ESTADO { get; set; }
        int APLICA_NOTA { get; set; }
        string CODIGO_NOTA { get; set; }
    }
}
