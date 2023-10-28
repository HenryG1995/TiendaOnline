using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class DETALLE_VENTA
    {
        public String CODIGO_VENTA { get; set; }
     
        public string CODIGO_PRODUCTO { get; set; }
        
        public String ESTADO { get; set; }
        
        public Int64? CANTIDAD { get; set; }

        public Int64? TOTAL { get; set; }
    }
}
