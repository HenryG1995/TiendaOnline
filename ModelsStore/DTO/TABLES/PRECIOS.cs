using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class PRECIOS
    {
        public string CODIGO_PRODUCTO { get; set; }
        public Int64 PRECIO { get; set; }
        public Int32 DESCUENTO { get; set; }
        public Int32 ACTIVO { get; set; }
    }
}
