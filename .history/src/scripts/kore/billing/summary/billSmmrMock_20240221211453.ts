export function billSmmrDummyData() {
  return [
    {
      Description: 'MOD BILL Total',
      Result: '0',
      Cell_Result: 'D4',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,billing',
      Order: '1',
    },
    {
      Description: 'MOD BILL Deflected #',
      Result: '0',
      Cell_Result: 'E4',
      Percentage: '0',
      Cell_Percentage: 'F4',
      Tags: 'billing summary,mod ivr,billing',
      Order: '2',
    },
    {
      Description: 'MOD BILL To Agent #',
      Result: '0',
      Cell_Result: 'G4',
      Percentage: '0',
      Cell_Percentage: 'H4',
      Tags: 'billing summary,mod ivr,billing',
      Order: '3',
    },
    {
      Description: 'MOD INCR Total',
      Result: '0',
      Cell_Result: 'D5',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,increase',
      Order: '4',
    },
    {
      Description: 'MOD INCR Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Increase' ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E5',
      Percentage: '0',
      Cell_Percentage: 'F5',
      Tags: 'billing summary,mod ivr,increase',
      Order: '5',
    },
    {
      Description: 'MOD INCR To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Increase' ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G5',
      Percentage: '0',
      Cell_Percentage: 'H5',
      Tags: 'billing summary,mod ivr,increase',
      Order: '6',
    },
    {
      Description: 'MOD QSTN Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Question'",
      Result: '0',
      Cell_Result: 'D6',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,question',
      Order: '7',
    },
    {
      Description: 'MOD QSTN Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Question' ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E6',
      Percentage: '0',
      Cell_Percentage: 'F6',
      Tags: 'billing summary,mod ivr,question',
      Order: '8',
    },
    {
      Description: 'MOD QSTN To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Question' ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G6',
      Percentage: '0',
      Cell_Percentage: 'H6',
      Tags: 'billing summary,mod ivr,question',
      Order: '9',
    },
    {
      Description: 'MOD VGUE Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Vague'",
      Result: '0',
      Cell_Result: 'D7',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,vague',
      Order: '10',
    },
    {
      Description: 'MOD VGUE Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Vague' ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E7',
      Percentage: '0',
      Cell_Percentage: 'F7',
      Tags: 'billing summary,mod ivr,vague',
      Order: '11',
    },
    {
      Description: 'MOD VGUE To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Vague' ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G7',
      Percentage: '0',
      Cell_Percentage: 'H7',
      Tags: 'billing summary,mod ivr,vague',
      Order: '12',
    },
    {
      Description: 'MOD PMNT Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc like '%Billing_Payment%'",
      Result: '0',
      Cell_Result: 'D8',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,payment',
      Order: '13',
    },
    {
      Description: 'MOD PMNT Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc like '%Billing_Payment%' ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E8',
      Percentage: '0',
      Cell_Percentage: 'F8',
      Tags: 'billing summary,mod ivr,payment',
      Order: '14',
    },
    {
      Description: 'MOD PMNT To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc like '%Billing_Payment%' ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G8',
      Percentage: '0',
      Cell_Percentage: 'H8',
      Tags: 'billing summary,mod ivr,payment',
      Order: '15',
    },
    {
      Description: 'MOD BLNC Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Balance'",
      Result: '0',
      Cell_Result: 'D9',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,balance',
      Order: '16',
    },
    {
      Description: 'MOD BLNC Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Balance' ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E9',
      Percentage: '0',
      Cell_Percentage: 'F9',
      Tags: 'billing summary,mod ivr,balance',
      Order: '17',
    },
    {
      Description: 'MOD BLNC To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND poc = 'Billing_Balance' ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G9',
      Percentage: '0',
      Cell_Percentage: 'H9',
      Tags: 'billing summary,mod ivr,balance',
      Order: '18',
    },
    {
      Description: 'MOD OTHR Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc NOT LIKE '%Billing_Payment%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND i.poc NOT LIKE '%Payment%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND i.poc NOT IN ('Billing_Increase','Billing_Question','Billing_Vague','Billing_Balance')",
      Result: '0',
      Cell_Result: 'D10',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,mod ivr,other',
      Order: '19',
    },
    {
      Description: 'MOD OTHR Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc NOT LIKE '%Billing_Payment%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND i.poc NOT LIKE '%Payment%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND i.poc NOT IN ('Billing_Increase','Billing_Question','Billing_Vague','Billing_Balance') ) WHERE row_trans = '1' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'E10',
      Percentage: '0',
      Cell_Percentage: 'F10',
      Tags: 'billing summary,mod ivr,other',
      Order: '20',
    },
    {
      Description: 'MOD OTHR To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM ( SELECT ucid,trans,ROW_NUMBER() OVER (PARTITION BY ucid ORDER BY CASE WHEN trans = 'Y' THEN 0 ELSE 1 end) AS row_trans FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.APPSERVER LIKE '%mod%' AND i.poc NOT LIKE '%Billing_Payment%' AND i.poc LIKE '%Billing%' AND i.poc NOT LIKE '%Mobile%' AND i.poc NOT LIKE '%Ent%' AND i.poc NOT LIKE '%Payment%' AND ucid NOT IN (SELECT ucid FROM kore.CALLINFO c WHERE CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss')) AND i.poc NOT IN ('Billing_Increase','Billing_Question','Billing_Vague','Billing_Balance') ) WHERE row_trans = '1' AND trans = 'Y'",
      Result: '0',
      Cell_Result: 'G10',
      Percentage: '0',
      Cell_Percentage: 'H10',
      Tags: 'billing summary,mod ivr,other',
      Order: '21',
    },
    {
      Description: 'CON Migrated Traffic %',
      Query: 'NA',
      Result: '0',
      Cell_Result: 'I4',
      Percentage: '0',
      Cell_Percentage: 'I4',
      Tags: 'billing summary,conversational ivr,migrated traffic',
      Order: '22',
    },
    {
      Description: 'CON BILL Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J4',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,billing',
      Order: '23',
    },
    {
      Description: 'CON BILL Deflected #',
      Query:
        "SELECT COUNT(DISTINCT ucid) FROM ( SELECT DISTINCT ucid FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT' AND TRANS = 'N' UNION SELECT DISTINCT ucid FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT' AND CATEGORY = '113' AND UCID IN (SELECT i.UCID FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.DNIS = '1977803' AND i.TRANS = 'N') )",
      Result: '0',
      Cell_Result: 'K4',
      Percentage: '0',
      Cell_Percentage: 'L4',
      Tags: 'billing summary,conversational ivr,billing',
      Order: '24',
    },
    {
      Description: 'CON BILL To Agent #',
      Query:
        "SELECT COUNT(DISTINCT ucid) FROM ( SELECT DISTINCT ucid FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT' AND TRANS = 'Y' AND category != '113' UNION SELECT DISTINCT ucid FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT' AND CATEGORY = '113' AND UCID IN (SELECT i.UCID FROM IVR_CALLFLOW.IVRCALLINFO i WHERE i.CALLSTOP BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND i.DNIS = '1977803' AND i.TRANS = 'Y') )",
      Result: '0',
      Cell_Result: 'M4',
      Percentage: '0',
      Cell_Percentage: 'N4',
      Tags: 'billing summary,conversational ivr,billing',
      Order: '25',
    },
    {
      Description: 'CON INCR Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc like '%Billing%Increase%' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J5',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,increase',
      Order: '26',
    },
    {
      Description: 'CON INCR Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc like '%Billing%Increase%' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'K5',
      Percentage: '0',
      Cell_Percentage: 'L5',
      Tags: 'billing summary,conversational ivr,increase',
      Order: '27',
    },
    {
      Description: 'CON INCR To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc like '%Billing%Increase%' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category != '113'",
      Result: '0',
      Cell_Result: 'M5',
      Percentage: '0',
      Cell_Percentage: 'N5',
      Tags: 'billing summary,conversational ivr,increase',
      Order: '28',
    },
    {
      Description: 'CON QSTN Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Questions' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J6',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,question',
      Order: '29',
    },
    {
      Description: 'CON QSTN Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Questions' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'N'",
      Result: '0',
      Cell_Result: 'K6',
      Percentage: '0',
      Cell_Percentage: 'L6',
      Tags: 'billing summary,conversational ivr,question',
      Order: '30',
    },
    {
      Description: 'CON QSTN To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Questions' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category != '113'",
      Result: '0',
      Cell_Result: 'M6',
      Percentage: '0',
      Cell_Percentage: 'N6',
      Tags: 'billing summary,conversational ivr,question',
      Order: '31',
    },
    {
      Description: 'CON VGUE Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Vague' and APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J7',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,vague',
      Order: '32',
    },
    {
      Description: 'CON VGUE Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Vague' AND trans = 'N' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'K7',
      Percentage: '0',
      Cell_Percentage: 'L7',
      Tags: 'billing summary,conversational ivr,vague',
      Order: '33',
    },
    {
      Description: 'CON VGUE To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Vague' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category != '113'",
      Result: '0',
      Cell_Result: 'M7',
      Percentage: '0',
      Cell_Percentage: 'N7',
      Tags: 'billing summary,conversational ivr,vague',
      Order: '34',
    },
    {
      Description: 'CON PMNT Total',
      Query:
        "SELECT count(distinct ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Payment_System' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J8',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,payment',
      Order: '35',
    },
    {
      Description: 'CON PMNT Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category = '113'",
      Result: '0',
      Cell_Result: 'K8',
      Percentage: '0',
      Cell_Percentage: 'L8',
      Tags: 'billing summary,conversational ivr,payment',
      Order: '36',
    },
    {
      Description: 'CON PMNT To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Payment_System' AND APPENTRY = 'Kore-Billing-BOT' AND category != '113' AND ucid IN ( SELECT ucid FROM IVR_CALLFLOW.IVRCALLINFO WHERE trans = 'Y')",
      Result: '0',
      Cell_Result: 'M8',
      Percentage: '0',
      Cell_Percentage: 'N8',
      Tags: 'billing summary,conversational ivr,payment',
      Order: '37',
    },
    {
      Description: 'CON BLNC Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Intercept_Balance' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J9',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,balance',
      Order: '38',
    },
    {
      Description: 'CON BLNC Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Intercept_Balance' AND trans = 'N' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'K9',
      Percentage: '0',
      Cell_Percentage: 'L9',
      Tags: 'billing summary,conversational ivr,balance',
      Order: '39',
    },
    {
      Description: 'CON BLNC To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc = 'Billing_Intercept_Balance' AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category != '113'",
      Result: '0',
      Cell_Result: 'M9',
      Percentage: '0',
      Cell_Percentage: 'N9',
      Tags: 'billing summary,conversational ivr,balance',
      Order: '40',
    },
    {
      Description: 'CON OTHR Total',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc IN ('POC_NOT_RECEIVED','Mobile_Other','Billing_Other') AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'J10',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,other',
      Order: '41',
    },
    {
      Description: 'CON OTHR Deflected #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc IN ('POC_NOT_RECEIVED','Mobile_Other','Billing_Other') AND trans = 'N' AND APPENTRY = 'Kore-Billing-BOT'",
      Result: '0',
      Cell_Result: 'K10',
      Percentage: '0',
      Cell_Percentage: 'L10',
      Tags: 'billing summary,conversational ivr,other',
      Order: '42',
    },
    {
      Description: 'CON OTHR To Agent #',
      Query:
        "SELECT count(DISTINCT ucid) FROM kore.CALLINFO c WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND poc IN ('POC_NOT_RECEIVED','Mobile_Other','Billing_Other') AND APPENTRY = 'Kore-Billing-BOT' AND trans = 'Y' AND category != '113'",
      Result: '0',
      Cell_Result: 'M10',
      Percentage: '0',
      Cell_Percentage: 'N10',
      Tags: 'billing summary,conversational ivr,other',
      Order: '43',
    },
    {
      Description: 'Missing Records',
      Query:
        "SELECT COUNT(UCID) FROM IVR_CALLFLOW.IVRCALLINFO i WHERE CATEGORY IN ('144','145') AND Trans = 'Y' AND callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss') AND UCID NOT IN (SELECT ucid FROM KORE.CALLINFO i2 WHERE callstop BETWEEN TO_DATE('dateStart 00:00:00', 'YYYY-MM-DD hh24:mi:ss') AND TO_DATE('dateEnd 23:59:59', 'YYYY-MM-DD hh24:mi:ss'))",
      Result: '0',
      Cell_Result: 'J11',
      Percentage: '100',
      Cell_Percentage: '',
      Tags: 'billing summary,conversational ivr,missing records',
      Order: '44',
    },
  ];
}
