from ast import Return
from src.python.rankWeather import rankWeather
from src.python.distanceGenerator import GetDistance
from src.python.coordinateGenerator import GetCoordinates
from src.python.apiRequestToYr import getWeather
from src.python.findNearLocation import GETLOCATIONINFO
from src.python.coordinatesfilter import ValidCoordinate
from operator import attrgetter, itemgetter
import warnings
from collections import defaultdict


warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import json


# TODO check if json match structure
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
        date, travel_time, lat, lon, transport = itemgetter('date', 'travel_time','lat', 'lon', 'transport')(input)
        self.date = date
        self.travel_time = travel_time
        self.startingCoordinates = [float(lat), float(lon)]
        self.transport = transport

    def initializeCoordinatesFetcher(self):
        distance = GetDistance(travelTime=f'{self.travel_time}',
        transportationMethod=self.transport).calculateDistance()
        response = GetCoordinates(
            startingCoordinates=self.startingCoordinates,
            distanceInKm = distance)
        response = response.retrieveEdgePoints()
        return response

    def callYr(self):
        travelDistance=GetDistance(travelTime=f'{self.travel_time}',transportationMethod=self.transport)
        locationDataFrame=GetCoordinates(self.startingCoordinates,travelDistance.calculateDistance())

        weatherDataFrame=pd.DataFrame(columns=['latitude', 'longitude','date', 'time', 'symbol', 'temperature', 'wind'])
        for index, row in locationDataFrame.retrieveMatrix().iterrows():

           if ValidCoordinate(row['lat'],row['lon']).validate(): #Validate if the coordinate is within the relevant area, such as a country. This is based on the polygon shape
                weatherDataFrame = weatherDataFrame.append(getWeather(row['lat'],row['lon'],self.date))
        return weatherDataFrame

    def cleanDF(self, df):
        tmpDict = {'rank': []}
        dfDict = df.groupby('rank').apply(lambda x:x[['weatherRank', 'longitutde','latitude','symbol','temperature','maxRank', 'wind', 'time', 'date']].to_dict(orient='records')).to_dict()
        tmpDict = tmpDict['rank'].append(dfDict)
        return tmpDict

    def findThebestlocation(self):
        weatherDataFrame=self.callYr()

        #filter out the correct date to be analyzed
        weatherDataFrame=weatherDataFrame[weatherDataFrame['date'] == self.date]

        weatherDataFrame['weatherRank'] = weatherDataFrame.apply(lambda row: rankWeather(row).calculate(),axis=1)   #Calculating the rank per time per location
        weatherDataFrame['maxRank'] = weatherDataFrame.groupby(['latitude', 'longitude'])['weatherRank'].transform(max)

        weatherDataFrame = weatherDataFrame.sort_values(['maxRank', 'weatherRank'],
              ascending = [False, False])

        # weatherDataFrame=weatherDataFrame[weatherDataFrame['time'] == '12:00:00']
        print(weatherDataFrame)
        weatherDataFrame=weatherDataFrame[0:16]
        # #Append locationname to array
        # locationNameDataFrame=pd.DataFrame(columns=['location'])

        # weatherDataFrame=weatherDataFrame.reset_index(drop=True)
        for index, row in weatherDataFrame.iterrows():
            lat=row['latitude']
            lon=row['longitude']
            locationNameDataFrame = locationNameDataFrame.append(GETLOCATIONINFO(lat,lon).LocationNamefromAPI())


        locationNameDataFrame = locationNameDataFrame.reset_index(drop=True)
        weatherDataFrame=pd.merge(weatherDataFrame, locationNameDataFrame, left_index=True, right_index=True)
        #futre selection of best weather
        outputJson = self.cleanDF(weatherDataFrame)
        print(outputJson)

        return outputJson

        #weatherDataFrame.to_csv("locationWeather.csv",sep=",")
        # locationDataFrameWithWeather.to_csv("locationWeather.csv",sep=",")
        # locationDataFrame.saveOutput()

params= {
    "date": "2022-11-03",

    "travel_time": "04:00",

    "lat": "60.651090163045026",

    "lon": "8.036618892015843",

    "transport": "Car"
}



Handler(params).findThebestlocation()
