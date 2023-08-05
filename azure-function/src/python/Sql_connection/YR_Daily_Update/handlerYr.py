from src.python.Sql_connection.YR_Daily_Update.addSunriseSunset import addSunriseSunset
from src.python.Sql_connection.YR_Daily_Update.addWeatherForecast import weatherForecast
from src.python.Sql_connection.YR_Daily_Update.addWeatherRank import weatherRanking
from src.python.Sql_connection.YR_Daily_Update.removeWeatherDatafromDB import deleteHistoricData
import time
class Handler:
    def __init__(self,config,BLOB_workflow = False,SQL_workflow=False) -> None:

       self.input=config["db"]
       self.server=config["server"]
       self.db=config["db"]
       self.username =config["username"]
       self.password=config["password"]
       self.driver=config["driver"]
       self.BLOB_workflow=BLOB_workflow
       self.SQL_workflow=SQL_workflow


    def updateSunsetSunrise(self, offset=0, step=0):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"
        SQL_workflow=self.SQL_workflow
        BLOB_workflow=self.BLOB_workflow

        result=addSunriseSunset(server,db,username,password,driver,country,SQL_workflow,BLOB_workflow, offset, step)

        if BLOB_workflow==True:
            return result
        else:
            return "Sunrise and sunset updated successfully"

    def updateWeatherForecast(self, offset=0, step=0):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"
        SQL_workflow=self.SQL_workflow
        BLOB_workflow=self.BLOB_workflow

        result=weatherForecast(server,db,username,password,driver,country,SQL_workflow,BLOB_workflow, offset, step)

        if BLOB_workflow==True:
            return result
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


# config = {
#     "db":"sunchaser",
#     "server": "sunchaser.database.windows.net",
#     "username": "sunchaser_admin",
#     "driver": "{ODBC Driver 17 for SQL Server}",
#     "password": "Sommerogsol2023"
# }

# time_start = time.time()
# print(f"Starting {time_start}")
# a = Handler(config, BLOB_workflow=True)
# a.updateWeatherForecast()
# print("time it took", time.time() - time_start )
