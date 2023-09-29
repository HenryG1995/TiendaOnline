using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class VENTAS
    {
        public string CODIGO_VENTA { get; set; }
        public string CODIGO_CLIENTE { get; set; }
        public DateTime FECHA_VENTA { get; set; }
        public string ESTADO { get; set; }
        public Int32 APLICA_NOTA { get; set; }
        public string CODIGO_NOTA { get; set; }
    }
}
