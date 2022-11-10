
from src.python.rankWeather import rankWeather
from src.python.distanceGenerator import GetDistance
from src.python.coordinateGenerator import GetCoordinates
from src.python.apiRequestToYr import getWeather
from src.python.findNearLocation import GETLOCATIONINFO
from src.python.coordinatesfilter import ValidCoordinate
from operator import attrgetter, itemgetter
import warnings
from collections import defaultdict
from datetime import datetime


#Filter because of error in lambda to weatherrank calculation
warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
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

        #Validate if the date is today or later
        if datetime.strptime(self.date+" 23:59:59", '%Y-%m-%d %H:%M:%S') < datetime.now():
            raise Exception("The date selected is before today")

        travelDistance=GetDistance(travelTime=f'{self.travel_time}',transportationMethod=self.transport)
        locationDataFrame=GetCoordinates(self.startingCoordinates,travelDistance.calculateDistance())

        weatherDataFrame=pd.DataFrame(columns=['latitude', 'longitude','date', 'time', 'symbol', 'temperature', 'wind'])
        for index, row in locationDataFrame.retrieveMatrix().iterrows():
           if ValidCoordinate(row['lat'],row['lon']).validate(): #Validate if the coordinate is within the relevant area, such as a country. This is based on the polygon shape
                weatherDataFrame = weatherDataFrame.append(getWeather(row['lat'],row['lon'],self.date))
        return weatherDataFrame

    def cleanDF(self, df):
        dfStartLocation=df.loc[(df['latitude'] == self.startingCoordinates[0]) & (df['longitude'] == self.startingCoordinates[1])]
        dfStartLocation = dfStartLocation.groupby('maxRank').apply(lambda x:x[['weatherRank', 'longitude','latitude', 'location','symbol','temperature', 'wind', 'time', 'date']].to_dict(orient='records')).to_dict()
        dfSeacrhLocations=df.loc[(df['latitude'] != self.startingCoordinates[0]) & (df['longitude'] != self.startingCoordinates[1])]

        dfDict = dfSeacrhLocations.groupby('maxRank').apply(lambda x:x[['weatherRank', 'longitude','latitude', 'location','symbol','temperature', 'wind', 'time', 'date']].to_dict(orient='records')).to_dict()
        tmpDict = {'userLocation':dfStartLocation ,'ranks': dfDict}
        return tmpDict

    def findThebestlocation(self):
        weatherDataFrame=self.callYr()
        #filter out the correct date to be analyzed

        weatherDataFrame=weatherDataFrame[weatherDataFrame['date'] == self.date]

        #Exception if datafram is empty
        if len(weatherDataFrame)==0:
            raise Exception("No data is found for the given date")

        weatherDataFrame['weatherRank'] = weatherDataFrame[['symbol', 'temperature','wind']].apply(lambda row: rankWeather(row).calculate(),axis=1)   #Calculating the rank per time per location
        weatherDataFrame['maxRank'] = weatherDataFrame.groupby(['latitude', 'longitude'])['weatherRank'].transform(max)
        weatherDataFrame = weatherDataFrame.sort_values(['maxRank', 'weatherRank'],
              ascending = [False, False])
        
        locationNameDataFrame=pd.DataFrame(columns=['location','latitude','longitude']) #Added lat lon for join with weather df
        
        for index, row in weatherDataFrame.drop_duplicates(subset=['latitude','longitude']).iterrows():
            lat=row['latitude']
            lon=row['longitude']
            locationNameDataFrame.loc[len(locationNameDataFrame)]=[GETLOCATIONINFO(lat,lon).MunicipalityNamefromAPI(),lat,lon]


        weatherDataFrame=pd.merge(weatherDataFrame, locationNameDataFrame, on=['latitude','longitude'])

        #weatherDataFrame.to_csv("test.csv",sep=',')

        #futre selection of best weather'
        outputJson = self.cleanDF(weatherDataFrame)
        return outputJson



# params= {
#     "date": "2022-11-11",

#     "travel_time": "04:00",

#     "lat": "60.651090163045026",

#     "lon": "10.036618892015843",

#     "transport": "Car"
# }



# Handler(params).findThebestlocation()
