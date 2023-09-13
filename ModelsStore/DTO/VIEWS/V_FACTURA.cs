using ModelsStore.DTO.TABLES;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.VIEWS
{
    public class V_FACTURA
    {
        string CODIGO_VENTA { get; set; }
        string CODIGO_CLIENTE { get; set; }
        string ESTADO { get; set; }
        string DESCRIPCION_GENERAL { get; set; }
        float TOTAL { get; set; }
        string CODIGO_ENTREGA { get; set; }
        string DESCRIPCION { get; set; }
        string DIRECCION { get; set; }

    }
}
