using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class SEGUIMIENTO_ENTREGA
    {

        public string CODIGO_ENTREGA { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime FECHA_ENTREGA { get; set; }
        public DateTime FECHA_SALIDA { get; set; }
        public Int32 ESTADO { get; set; }
        public DateTime FECHA_REGISTRA { get; set; }

    }
}
