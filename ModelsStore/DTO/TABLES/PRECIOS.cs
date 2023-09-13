using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class PRECIOS
    {
        string CODIGO_PRODUCTO { get; set; }
        float PRECIO { get; set; }
        int DESCUENTO { get; set; }
        int ACTIVO { get; set; }
    }
}
