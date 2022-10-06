
import apiRequestToYr as api_yr
import coordinateGenerator as cor_gen
import distanceGenerator as dis_gen
import pandas as pd

travelTime='6:30'
datetime_str="2022-07-20"
transportationMethod="walk"
startPoint=[59.9139,10.7522]


travelDistance=dis_gen.GetDistance(travelTime,transportationMethod)
locationDataFrame=cor_gen.GetCoordinates(startPoint,travelDistance.calculateDistance())

locationWeatherList=[]

for index, row in locationDataFrame.retrieveMatrix().iterrows():
    locationWeather=api_yr.getWeather(row['lat'],row['lon'],"2022-07-20")
    locationWeatherList.append(locationWeather)


locationWeatherDataFrame=pd.DataFrame(locationWeatherList)

locationDataFrameWithWeather=locationDataFrame.retrieveMatrix().join(locationWeatherDataFrame)

locationDataFrameWithWeather.to_csv("locationWeather.csv",sep=",")

locationDataFrame.saveOutput()