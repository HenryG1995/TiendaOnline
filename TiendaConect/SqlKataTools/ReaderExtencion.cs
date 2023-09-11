
using System;
using System.Collections.Generic;
using System.Data;
namespace ClassDB.SqlKataTools
{
    public static class DataReaderMapper<T>
    {
        public static List<T> MapToList(IDataReader reader)
        {
            List<T> list = new List<T>();
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
        }
        public static T MapToObject(IDataReader reader)
        {
            T obj = default(T);
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
            return obj;
        }
    }
}