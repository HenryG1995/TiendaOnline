using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class INVENTARIO
    {
        public string CODIGO_PRODUCTO { get; set; }
        public string NOMBRE_PRODUCTO { get; set; }
        public string DESCRIPCION_PRODUCTO { get; set; }
        public Int64 UNIDADES_EXISTENTES { get; set; }
        public DateTime FECHA_CARGA { get; set; }
        public DateTime FECHA_INGRESO { get; set; }
        public string UUID_ESTADO { get; set; }
        public Int32 ACTIVO { get; set; }
        public string CODIGO_PROVEEDOR { get; set; }
        public DateTime CADUCIDAD { get; set; }

    }
}
