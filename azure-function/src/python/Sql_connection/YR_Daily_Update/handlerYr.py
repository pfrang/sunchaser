from src.python.Sql_connection.YR_Daily_Update.addSunriseSunset import addSunriseSunset_response
from src.python.Sql_connection.YR_Daily_Update.addWeatherForecast import weatherForecast
from src.python.Sql_connection.YR_Daily_Update.addWeatherRank import weatherRanking

class Handler:
    def __init__(self,config) -> None:
       
       self.input=config["db"]
       self.server=config["server"]
       self.db=config["db"]
       self.username =config["username"]
       self.password=config["password"]
       self.driver=config["driver"]


    def updateSunsetSunrise(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"

        addSunriseSunset_response(server,db,username,password,driver,country)

        response = "Sunrise and sunset updated successfully"
        return response
    
    def updateWeatherForecast(self):
        server=self.server
        db=self.db
        username=self.username
        password=self.password
        driver=self.driver
        country="Norway"

        weatherForecast(server,db,username,password,driver,country)

        response= "Weatherforecast updated successfully"
        return response