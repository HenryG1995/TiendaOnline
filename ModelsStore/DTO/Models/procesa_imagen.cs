using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.Models
{
    public class procesa_imagen
    {

        public string uuid { get; set; } = Guid.NewGuid().ToString();

        public string imagen { get; set; }
    }
}
