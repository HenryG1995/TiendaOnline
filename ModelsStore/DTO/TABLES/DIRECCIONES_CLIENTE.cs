using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class DIRECCIONES_CLIENTE
    {
        public string CODIGO_CLIENTE {  get; set; }
        public Decimal NO_DIR {  get; set; }
        public string DESCRIPCION_DIRECCION {  get; set; }
        public string ZONA {  get; set; }
        public string MUNICIPIO { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string PAIS { get; set; }
        public string NOTAS_ADICIONALES { get; set; }
    }
}
