from ast import Return
from src.python.distanceGenerator import GetDistance
from src.python.coordinateGenerator import GetCoordinates
from src.python.apiRequestToYr import getWeather
from src.python.findNearLocation import GETLOCATIONINFO
from src.python.coordinatesfilter import ValidCoordinate
from operator import attrgetter, itemgetter
import warnings


warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import json


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

        weatherDataFrame=pd.DataFrame(columns=['latitude', 'longitude','date', 'time', 'symbol', 'temperature', 'wind'])
        for index, row in locationDataFrame.retrieveMatrix().iterrows():

           if ValidCoordinate(row['lat'],row['lon']).validate(): #Validate if the coordinate is within the relevant area, such as a country. This is based on the polygon shape
                weatherDataFrame = weatherDataFrame.append(getWeather(row['lat'],row['lon'],self.date))
        return weatherDataFrame


    def findThebestlocation(self):
        weatherDataFrame=self.callYr()

        #filter out the correct date to be analyzed
        weatherDataFrame=weatherDataFrame[weatherDataFrame['date'] == self.date]
        weatherDataFrame=weatherDataFrame[weatherDataFrame['time'] == '12:00:00']
        #futre selection of best weather
        weatherDataFrame=weatherDataFrame[0:4]
        #Append locationname to array
        locationNameDataFrame=pd.DataFrame(columns=['Location'])
        
        weatherDataFrame=weatherDataFrame.reset_index(drop=True)
        for index, row in weatherDataFrame.iterrows():
            lat=row['latitude']
            lon=row['longitude']

            locationNameDataFrame = locationNameDataFrame.append(GETLOCATIONINFO(lat,lon).LocationNamefromAPI())

        locationNameDataFrame = locationNameDataFrame.reset_index(drop=True)
        weatherDataFrame=pd.merge(weatherDataFrame, locationNameDataFrame, left_index=True, right_index=True)

        weatherDataFrame.to_csv("locationWeather.csv",sep=",")
        filterOnProvidedDateDF = weatherDataFrame.astype(str)
        locationDataFrameWithWeatherToJSON = json.loads(filterOnProvidedDateDF.to_json(orient='records'))
        return locationDataFrameWithWeatherToJSON

        # locationDataFrameWithWeather.to_csv("locationWeather.csv",sep=",")
        # locationDataFrame.saveOutput()


params = {

        "date": "2022-10-24",
        "hrs": "10",
        "lat": "59.5748",
        "lon": "10.748329",
        "mins": "0",
        "transport": "Car"
    }


initializer = Handler(params)
initializer.findThebestlocation()