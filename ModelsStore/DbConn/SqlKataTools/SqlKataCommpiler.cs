using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using SqlKata;
using SqlKata.Compilers;
namespace ClassDB.SqlKataTools
{
    public class SqlKataCommpiler
    {
        private static SqlServerCompiler _compilerSQL = new SqlServerCompiler();
        private static PostgresCompiler _compilerPsg = new PostgresCompiler();
        private static OracleCompiler _compiler = new OracleCompiler();
        public static string OraCompileQuery(Query query)
        {
            //compila el query para adaptarlo al oracle
            var queryResult = _compiler.Compile(query);

            var stringquery = queryResult.ToString();

            if (stringquery.Contains(", false"))
            {
                stringquery = stringquery.Replace(", false", ", 0");
            }
            if (stringquery.Contains(", true"))
            {
                stringquery = stringquery.Replace(", true", ", 1");
            }
            if (stringquery.Contains(", '0001-01-01'"))
            {
                stringquery = stringquery.Replace(", '0001-01-01'", ", to_date('2003-01-01 01:01:01','YYYY-MM-DD HH24:MI:SS') ");
            }

            string patron = @"'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'";

            string resultado = Regex.Replace(stringquery, patron, "to_date('$1','YYYY-MM-DD HH24:MI:SS')");

            stringquery = resultado;

            return stringquery.ToString();
        }
        public static string PsgCompileQuery(Query query)
        {
            //compila el query para adaptarlo al postgresql
            var queryResult = _compilerPsg.Compile(query);

            var stringquery = queryResult.ToString();

            stringquery = stringquery.Replace("FROM", "FROM \"FNREACT\".");

      


            return stringquery.ToString();
        }
        public static string SqlCompileQuery(Query query)
        {
            //compila el query para adaptarlo al sql server
            var queryResult = _compilerSQL.Compile(query);

            var stringquery = queryResult.ToString();

         


            return stringquery.ToString();
        }
    }
}
