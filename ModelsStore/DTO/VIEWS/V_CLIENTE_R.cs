﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsStore.DTO.TABLES
{
    public class V_CLIENTE_R
    {
        public string? CODIGO_CLIENTE { get; set; }
        public string? PRIMER_NOMBRE { get; set; }
        public string? SEGUNDO_NOMBRE { get; set; }
        public string? PRIMER_APELLIDO { get; set; }
        public string? SEGUNDO_APELLIDO { get; set; }
        public string? NIT { get; set; }
        public string? DIRECCION_CLIENTE { get; set; }
        public string? ESTADO { get; set; }
        public string? CATEGORIA { get; set; }
        public decimal? TELEFONO { get; set; }
    }
}