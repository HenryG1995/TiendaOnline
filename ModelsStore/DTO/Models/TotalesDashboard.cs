using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.Models
{
    public class TotalesDashboard
    {
        public Int64 TotalClientes {  get; set; }
        public Int64 TotalVentas {  get; set; }
        public Int64 TotalProductos {  get; set; }
        public Int64 TotalIngresoPaquete {  get; set; }
    }
}
