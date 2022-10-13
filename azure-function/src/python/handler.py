from src.python.distanceGenerator import GetDistance
from src.python.coordinateGenerator import GetCoordinates
from src.python.apiRequestToYr import getWeather
from operator import attrgetter, itemgetter
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import json

travelTime='6:30'
datetime_str="2022-07-20"
transportationMethod="walk"
startPoint=[59.9139,10.7522]

def jsonChecker(json) -> bool:
    json_structure = {
        "params": {
            "date": "",
            "hrs": "",
            "lat":"",
            "lon": "",
            "mins": "",
            "transport": ""
        }
    }

    True if json == json_structure else False

class Handler:
    def __init__(self, input) -> None:
        date, hrs, lat, lon, mins, transport = itemgetter('date', 'hrs', 'lat', 'lon', 'mins', 'transport')(input) #make it not index based of destructure
        self.date = date
        self.hrs = hrs
        self.startingCoordinates = [float(lat), float(lon)]
        self.mins = mins
        self.transport = transport

    def initializeCoordinatesFetcher(self):
        distance = GetDistance(travelTime=f'{self.hrs}:{self.mins}',
        transportationMethod=self.transport).calculateDistance()
        response = GetCoordinates(
            startingCoordinates=self.startingCoordinates,
            distanceInKm = distance)
        response = response.retrieveEdgePoints()
        return response

    def callYr(self):
        travelDistance=GetDistance(travelTime=f'{self.hrs}:{self.mins}',transportationMethod=self.transport)
        locationDataFrame=GetCoordinates(self.startingCoordinates,travelDistance.calculateDistance())

        weatherDataFrame=pd.DataFrame(columns=['Latitude', 'Longitude','Date', 'Time', 'Symbol', 'Temperature', 'Wind'])
        for index, row in locationDataFrame.retrieveMatrix().iterrows():
            weatherDataFrame = weatherDataFrame.append(getWeather(row['lat'],row['lon'],self.date))

        filterOnProvidedDateDF = weatherDataFrame[weatherDataFrame['Date'] == self.date]
        locationDataFrameWithWeatherToJSON = json.loads(filterOnProvidedDateDF.to_json(orient='records'))
        return locationDataFrameWithWeatherToJSON

        # locationDataFrameWithWeather.to_csv("locationWeather.csv",sep=",")
        # locationDataFrame.saveOutput()
