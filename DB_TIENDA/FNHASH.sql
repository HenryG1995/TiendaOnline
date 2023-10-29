create FUNCTION FNHASH (TEXTO VARCHAR2) RETURN VARCHAR2
IS
    V_VALUE VARCHAR2(100);
BEGIN
    SELECT STANDARD_HASH(TEXTO, 'MD5') INTO V_VALUE FROM DUAL;
    RETURN V_VALUE;
END;
/

