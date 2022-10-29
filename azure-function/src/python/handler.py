from ast import Return
from heapq import merge
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

    def cleanDF(self,df):
        result = {
            "rank": {
                "1": [{
                    "lat": "value",
                    "lon": "fwe",
                    "times": [{
                        "rank": "value",
                        "time": "value",
                        "data": {
                            "wind": "value"
                        }
                    },
                    {
                        "time": "value",
                        "rank": "value",
                        "data": {
                            "wind": "value"
                        }
                    }],
                }],
                "2": {

                }
            }
        }
        dict = {}
        # for idx,row in df.iterrows():
        #     rank = row['rank']
        #     latitude = row['latitude']
        #     longitude = row['longitude']
        #     # latitude = row['latitude']
        #     # latitude = row['latitude']
        #     if(rank in dict.keys()):
        #         dict[rank].append({ 'latitude':row['latitude'], 'longitude': row['longitude'] })
        #     else:
        #         dict[rank] = [{ 'latitude':row['latitude'], 'longitude': row['longitude'] }]


        print(dict)
        return df



    def findThebestlocation(self):
        weatherDataFrame=self.callYr()

        #filter out the correct date to be analyzed
        weatherDataFrame=weatherDataFrame[weatherDataFrame['date'] == self.date]
        # weatherDataFrame=weatherDataFrame[weatherDataFrame['time'] == '12:00:00']

        weatherDataFrame=weatherDataFrame[0:16]
        #Append locationname to array
        locationNameDataFrame=pd.DataFrame(columns=['Location'])

        weatherDataFrame=weatherDataFrame.reset_index(drop=True)
        for index, row in weatherDataFrame.iterrows():
            lat=row['latitude']
            lon=row['longitude']

            locationNameDataFrame = locationNameDataFrame.append(GETLOCATIONINFO(lat,lon).LocationNamefromAPI())

        locationNameDataFrame = locationNameDataFrame.reset_index(drop=True)
        weatherDataFrame=pd.merge(weatherDataFrame, locationNameDataFrame, left_index=True, right_index=True)
        rankDict = { "rank": [1,1,3,4,2,3,1,3,2,4,3,2,1,2,3,4], "weatherRank": [10,13,34,42,22,34,11,35,21,49,76,34,87,98,23,10]}
        rankDF = pd.DataFrame(rankDict)
        #futre selection of best weather
        mergeDF = pd.merge(weatherDataFrame,rankDF, left_index=True, right_index=True)
        mergeDF = mergeDF.groupby('rank').apply(lambda x:x.to_dict()).to_dict()
        print(mergeDF)
        # mergeDF = mergeDF.groupby('rank').apply(lambda x:x.set_index('time').to_dict(orient='index')).to_dict()
        # mergeDF = mergeDF.groupby('rank').apply(lambda x:x.groupby(['longitude']).apply(list).to_dict()).to_dict()
        # print(mergeDF)
        # mergeDF = mergeDF.groupby('rank').apply(lambda x:x[['longitude', 'latitude', 'time']].to_dict(orient='records')).to_dict()
        # mergeDF = mergeDF.groupby('rank').groupby('latitude')
        # print(mergeDF)
        # print(json.dumps(mergeDF, indent=4))
        # mergeDF = mergeDF.apply(lambda x:x)
        # print(mergeDF)
        # levels = len(mergeDF.index.levels)
        # dicts = [{} for i in range(levels)]
        # last_index = None

        # for index,value in mergeDF.itertuples():

        #     if not last_index:
        #         last_index = index

        #     for (ii,(i,j)) in enumerate(zip(index, last_index)):
        #         if not i == j:
        #             ii = levels - ii -1
        #             dicts[:ii] =  [{} for _ in dicts[:ii]]
        #             break

        #     for i, key in enumerate(reversed(index)):
        #         dicts[i][key] = value
        #         value = dicts[i]

        #     last_index = index


        # result = json.dumps(dicts[-1])
        # print(result)
        # print(mergeDF)
        # mergeDF = self.cleanDF(mergeDF)
        # filterOnProvidedDateDF = mergeDF.astype(str)
        # # print(filterOnProvidedDateDF)
        # locationDataFrameWithWeatherToJSON = json.loads(filterOnProvidedDateDF.to_json(orient='records'))
        # response_str = json.dumps(locationDataFrameWithWeatherToJSON, indent=4)
        # # print(response_str)
        # return locationDataFrameWithWeatherToJSON

        # weatherDataFrame.to_csv("locationWeather.csv",sep=",")
        # locationDataFrameWithWeather.to_csv("locationWeather.csv",sep=",")
        # locationDataFrame.saveOutput()

params= {
    "date": "2022-10-28",

    "travel_time": "04:00",

    "lat": "60.651090163045026",

    "lon": "8.036618892015843",

    "transport": "Car"
}



Handler(params).findThebestlocation()
