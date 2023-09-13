using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    internal class CLIENTE
    {
        string CODIGO_CLIENTE { get; set; }
        string PRIMER_NOMBRE { get; set; }
        string SEGUNDO_NOMBRE { get; set; }
        string PRIMER_APELLIDO { get; set; }
        string SEGUNDO_APELLIDO { get; set; }
        int NIT { get; set; }
        string DIRECCION_CLIENTE { get; set; }
        string CODIGO_ESTADO { get; set; }
        string CODIGO_CATEGORIA { get; set; }
    }
}
