using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class EMPRESA
    {
        public string CODIGO_EMPRESA { get; set; }
        public string NOMBRE { get; set; }
        public string DIRECCION { get; set; }
        public string NIT { get; set; }
        public string RAZON_SOCIAL { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime FECHA_REGISTRO { get; set; }
        public DateTime FECHA_MODIFICACION { get; set; }
        public Int32 ACTIVO { get; set; }
    }
}
