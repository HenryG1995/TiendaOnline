create FUNCTION NEWID(SYSID IN VARCHAR2) RETURN VARCHAR2 AS
    cadena VARCHAR2(2000) := SYSID; V_var VARCHAR2(1000); V_BLOQUES VARCHAR2(2000); V_BLOQUEA VARCHAR2(2000);
BEGIN
    FOR i IN 1..LENGTH(SYSID)
        LOOP
            v_var := substr(cadena, i, 1);
            if i = 8 then
                V_BLOQUES := V_BLOQUES || v_var || '-';
            else
                if i = 12 then
                    V_BLOQUES := V_BLOQUES || v_var || '-';
                else
                    if i = 16 then V_BLOQUES := V_BLOQUES || v_var || '-'; end if;
                end if;
            end if;
            V_BLOQUES := V_BLOQUES || v_var;
        END LOOP;
    RETURN V_BLOQUES;
END NEWID;
/

