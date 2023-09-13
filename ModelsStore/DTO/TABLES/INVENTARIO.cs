using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    internal interface INVENTARIO
    {
        string CODIGO_PRODUCTO { get; set; }
        string NOMBRE_PRODUCTO { get; set; }
        string DESCRIPCION_PRODUCTO { get; set; }
        int UNIDADES_EXISTENTES { get; set; }
        DateTime FECHA_CARGA { get; set; }
        DateTime FECHA_INGRESO { get; set; }
        string UUID_ESTADO { get; set; }
        int ACTIVO { get; set; }
        string CODIGO_PROVEEDOR { get; set; }
        DateTime CADUCIDAD { get; set; }

    }
}
