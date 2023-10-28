
using System;
using System.Collections.Generic;
using System.Data;
namespace ClassDB.SqlKataTools
{
    public static class DataReaderMapper<T>
    {
        public static List<T> MapToList(IDataReader reader)
        {
            var a = "prueba";
            List<T> list = new List<T>();
            try
            {

            while (reader.Read())
            {
                T obj = Activator.CreateInstance<T>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    var property = typeof(T).GetProperty(reader.GetName(i));
                    if (property != null && reader.GetValue(i) != DBNull.Value)
                    {
                        object value = reader.GetValue(i);
                        property.SetValue(obj, value, null);
                    }
                }
                list.Add(obj);
            }
            return list;
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return list;
            }
        }
        public static T MapToObject(IDataReader reader)
        {
#pragma warning disable CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL
            T obj = default(T);
#pragma warning restore CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL
            if (reader.Read())
            {
                obj = Activator.CreateInstance<T>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    var property = typeof(T).GetProperty(reader.GetName(i));
                    if (property != null && reader.GetValue(i) != DBNull.Value)
                    {
                        object value = reader.GetValue(i);
                        property.SetValue(obj, value, null);
                    }
                }
            }
#pragma warning disable CS8603 // Posible tipo de valor devuelto de referencia nulo
            return obj;
#pragma warning restore CS8603 // Posible tipo de valor devuelto de referencia nulo
        }
    }
}