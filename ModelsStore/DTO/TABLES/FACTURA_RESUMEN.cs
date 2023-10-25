using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class FACTURA_RESUMEN
    {

        public string CODIGO_VENTA { get; set; }

        public double TOTAL { get; set; }
        
        public DateTime FECHA_EMISION { get; set; }
        
        public int TOTAL_PRODUCTOS { get; set; }
        
        public String ESTADO { get; set; }

        public DateTime FECHA_ACTUALIZACION { get; set; }

    }
}
