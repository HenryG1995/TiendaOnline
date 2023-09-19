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
        public float PRECIO { get; set; }
        public int DESCUENTO { get; set; }
        public int ACTIVO { get; set; }
    }
}
