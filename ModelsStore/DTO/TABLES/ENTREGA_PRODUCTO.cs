using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class ENTREGA_PRODUCTO
    {
        string CODIGO_ENTREGA { get; set; }
        string CODIGO_VENTA { get; set; }
        string DESCRIPCION { get; set; }
        string DIRECCION { get; set; }
        string COORDENADAS { get; set; }
    }
}
