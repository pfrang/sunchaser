from src.python.Sql_connection.YR_Daily_Update.addSunriseSunset import addSunriseSunset
from src.python.Sql_connection.YR_Daily_Update.addWeatherForecast import weatherForecast
from src.python.Sql_connection.YR_Daily_Update.addWeatherRank import weatherRanking
from src.python.Sql_connection.YR_Daily_Update.removeWeatherDatafromDB import deleteHistoricData

class Handler:
    def __init__(self,config,BLOB_workflow,SQL_workflow) -> None:
       
       self.input=config["db"]
       self.server=config["server"]
       self.db=config["db"]
       self.username =config["username"]
       self.password=config["password"]
       self.driver=config["driver"]
       self.BLOB_workflow=BLOB_workflow
       self.SQL_workflow=SQL_workflow


    def updateSunsetSunrise(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"
        SQL_workflow=self.SQL_workflow
        BLOB_workflow=self.BLOB_workflow

        jsonData=addSunriseSunset(server,db,username,password,driver,country,SQL_workflow,BLOB_workflow)

        if BLOB_workflow==True:
            return jsonData
        else:
            response = "Sunrise and sunset updated successfully"
            return response
    
    def updateWeatherForecast(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"
        SQL_workflow=self.SQL_workflow
        BLOB_workflow=self.BLOB_workflow

        jsonData=weatherForecast(server,db,username,password,driver,country,SQL_workflow,BLOB_workflow)

        if BLOB_workflow==True:
            return jsonData
        else:
            response= "Weatherforecast updated successfully"
            return response
    
    def updateWeatherRank(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"
        SQL_workflow=self.SQL_workflow
        BLOB_workflow=self.BLOB_workflow

        weatherRanking(server,db,username,password,driver,country,SQL_workflow,BLOB_workflow)

        response="Weatherranking updated successfully"
        return response
    
    def deleteOldData(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"

        deleteHistoricData(server,db,username,password,driver,country)

        response="Weatherdata deleted successfully"
        return response