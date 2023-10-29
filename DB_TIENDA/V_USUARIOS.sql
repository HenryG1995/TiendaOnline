create view V_USUARIOS as
select CODIGO_USUARIO,
       USER_ID,
       '*****' PASSWORD_USER,
       CORREO,
       ESTADO
from USUARIOS
/

