using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    internal class SEGUIMIENTO_ENTREGA
    {

        string CODIGO_ENTREGA { get; set; }
        string DESCRIPCION { get; set; }
        DateTime FECHA_ENTREGA { get; set; }
        DateTime FECHA_SALIDA { get; set; }
        int ESTADO { get; set; }
        DateTime FECHA_REGISTRA { get; set; }

    }
}
