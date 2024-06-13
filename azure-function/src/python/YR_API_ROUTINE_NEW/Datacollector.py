import pyodbc
import logging
import requests
import json
import pandas as pd

class NewData:
    def __init__(self, conn_str, params):
        self.cursor = pyodbc.connect(conn_str).cursor()
        self.params = params
        self.urL = "https://api.met.no/weatherapi/locationforecast/2.0/compact"
        self.headers={'User-Agent':'Hjemmeprosjekt 2'}

    def get_sql_list(self):
        
        SQL_query = '''

                DECLARE @Offset as INT
                DECLARE @Step as INT

                SET @Offset=?
                SET @Step=?

                SELECT * FROM [dbo].[coordinates_all] ORDER by lat, lon

                OFFSET @Offset ROWS
                FETCH NEXT @Step ROWS ONLY
                '''

        self.cursor.execute(SQL_query, self.params["Offset"], self.params["Step"])
        response=self.cursor.fetchall()

        self.cursor.close()
        return response
    
    def get_data_from_yr(self):
        cleaned_data_result = []
        locations = self.get_sql_list()

        for location in locations:
            # logg the location lat and lon
            logging.info(f'Getting data from YR for lat: {location[0]}, lon: {location[1]}')
            response = self.YR_API(location[0], location[1])
            if response.status_code == 200:
                data = response.json()
                # data=json.dumps(data, indent=4,ensure_ascii=False)
                
                cleaned_data = self.Handle_response(location[0], location[1], data)
                cleaned_data = self.compress_data(cleaned_data)

                # Append the cleaned data to the final DataFrame
                cleaned_data_result.append(cleaned_data)

            else:
                logging.error(f'Error code: {response.status_code}')
                logging.error(f'Error message: {response.text}')
        
        final_df = pd.concat(cleaned_data_result, ignore_index=True)
        return final_df


    def YR_API(self, lat, lon):
        url=f'{self.urL}?lat={lat}&lon={lon}'
        response = requests.get(url, headers=self.headers, timeout=7)
        return response
    
    def Handle_response(self,lat,lon,data):
        response_json=data['properties']["timeseries"]

        weatherDate=[]
        weatherTime=[]
        weatherSymbol= []
        weatherTemperature=[]
        weatherWind=[]
        latArr=[]
        lonArr=[]
        hRank = []
        dRank = []


        for i in response_json:

            Flag=False

            if("next_1_hours" in i["data"].keys()):
                weatherSymbol.append(i["data"]["next_1_hours"]["summary"]["symbol_code"].split("_")[0])
                Flag=True
            elif("next_6_hours" in i["data"].keys()):
                weatherSymbol.append(i["data"]["next_6_hours"]["summary"]["symbol_code"].split("_")[0])
                Flag=True

            if Flag:
                weatherDate.append(str(i["time"]).split('T')[0])
                weatherTime.append(str(i["time"]).split('T')[1][:-1])
                weatherTemperature.append(i["data"]["instant"]["details"]["air_temperature"])
                weatherWind.append(i["data"]["instant"]["details"]["wind_speed"])
                latArr.append(lat)
                lonArr.append(lon)

                hRank.append(self.calculate_rank(weatherSymbol[-1],weatherTemperature[-1],weatherWind[-1]))

        weatherDataDataFrame=pd.DataFrame({
            'lat': latArr,
            'lon': lonArr,
            'date':weatherDate,
            'time':weatherTime,
            'symbol':weatherSymbol,
            'temperature': weatherTemperature,
            'wind': weatherWind,
            'src': "yr api",
            'hRank': hRank
            })

        # Calculate the maximum hRank for each date
        dRank = weatherDataDataFrame.groupby('date')['hRank'].max().reset_index()

        # Merge the dRank DataFrame with the original DataFrame
        weatherDataDataFrame = pd.merge(weatherDataDataFrame, dRank, on='date', how='left')

        # Rename the columns
        weatherDataDataFrame.rename(columns={'hRank_x': 'hRank', 'hRank_y': 'dRank'}, inplace=True)

        return weatherDataDataFrame
   
    def calculate_rank(self,symbol,temperature,wind):
        # Calculate the rank
        return 0.99*temperature + 0.01*wind
    
    def compress_data(self, data):
        # Define a function to compress a group of rows into a list of dictionaries
        def compress_group(group):
            return [{'lat': lat, 'lon': lon, 'date': date, 'time': t, 'symbol': s, 'wind': w, 'src': src, 'hRank': h} for lat, lon, date, t, s, w, src, h in zip(group['lat'], group['lon'], group['date'], group['time'], group['symbol'], group['wind'], group['src'], group['hRank'])]

        # Group by 'lat', 'lon', and 'date' and apply the compress_group function to each group
        compressed = data.groupby(['lat', 'lon', 'date']).apply(compress_group).reset_index(name='compressed')

        # Convert the 'compressed' column to string type and add double quotes around the strings
        compressed['compressed'] = compressed['compressed'].astype(str).apply(lambda x: f"\"{x}\"")

        # Merge the compressed data with the original data to get the 'dRank' for each date
        compressed_data = pd.merge(data[['lat', 'lon', 'date', 'dRank']].drop_duplicates(), compressed, on=['lat', 'lon', 'date'])

        return compressed_data