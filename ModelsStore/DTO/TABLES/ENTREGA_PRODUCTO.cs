using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class ENTREGA_PRODUCTO
    {
        public string CODIGO_ENTREGA { get; set; }
        public string CODIGO_VENTA { get; set; }
        public string DESCRIPCION { get; set; }
        public string DIRECCION { get; set; }
        public string COORDENADAS { get; set; }
    }
}
