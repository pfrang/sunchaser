import pyodbc 

def clearSQLtable(TableName):

    server = 'sunchaser.database.windows.net'
    database = 'sunchaser'
    username = 'sunchaser_admin'
    password = 'Sommerogsol2023'   
    driver= '{ODBC Driver 17 for SQL Server}'

    conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = conn.cursor()

    cursor.execute(f'''
                    DELETE FROM {TableName}; 
                ''')

    conn.commit()


clearSQLtable('coordinates_locationdata')