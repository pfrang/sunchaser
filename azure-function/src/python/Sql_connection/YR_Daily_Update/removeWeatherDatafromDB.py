import pyodbc 

def deleteHistoricData(server,database,username,password,driver,country):

    conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = conn.cursor()

    #Delete data older than yesterdat in the db
    sql='''
    
        DELETE FROM [dbo].[suntime_schedule] WHERE date<DATEADD(DAY, -1, CAST(GETDATE() AS DATE))
        DELETE FROM [dbo].[weather_forecast] WHERE date<DATEADD(DAY, -1, CAST(GETDATE() AS DATE))
        DELETE FROM [dbo].[weather_forecast_global] WHERE date<DATEADD(DAY, -1, CAST(GETDATE() AS DATE))
        DELETE FROM [dbo].[weather_forecast_local] WHERE date<DATEADD(DAY, -1, CAST(GETDATE() AS DATE))
    '''

    cursor.execute(sql)
    conn.commit()
