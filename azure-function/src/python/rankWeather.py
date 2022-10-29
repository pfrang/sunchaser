
import math


global WeatherSymbolTable

WeatherSymbolTable={
    "Clear sky": {
        "TYPE": "SUN",
        "TYPE RANK": "1",
        "GROUP RANK": "1",
        "RANK": "1"
    },
    "Fair": {
        "TYPE": "SUN",
        "TYPE RANK": "1",
        "GROUP RANK": "2",
        "RANK": "2"
    },
    "Partly cloudy": {
        "TYPE": "CLOUD",
        "TYPE RANK": "2",
        "GROUP RANK": "1",
        "RANK": "3"
    },
    "Fog": {
        "TYPE": "CLOUD",
        "TYPE RANK": "2",
        "GROUP RANK": "2",
        "RANK": "4"
    },
    "Cloudy": {
        "TYPE": "CLOUD",
        "TYPE RANK": "2",
        "GROUP RANK": "3",
        "RANK": "5"
    },
    "Light rain": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "1",
        "RANK": "6"
    },
    "Rain": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "2",
        "RANK": "7"
    },
    "Heavy rain": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "3",
        "RANK": "8"
    },
    "Light rain showers": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "1",
        "RANK": "15"
    },
    "Rain showers": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "2",
        "RANK": "18"
    },
    "Heavy rain showers": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "3",
        "RANK": "21"
    },
    "Light rain showers and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "1",
        "RANK": "24"
    },
    "Rain showers and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "2",
        "RANK": "30"
    },
    "Heavy rain showers and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "3",
        "RANK": "36"
    },
    "Light rain and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "1",
        "RANK": "25"
    },
    "Rain and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "2",
        "RANK": "31"
    },
    "Heavy rain and thunder": {
        "TYPE": "RAIN",
        "TYPE RANK": "3",
        "GROUP RANK": "3",
        "RANK": "37"
    },
    "Light sleet": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "1",
        "RANK": "9"
    },
    "Sleet": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "2",
        "RANK": "11"
    },
    "Heavy sleet": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "3",
        "RANK": "13"
    },
    "Light sleet showers": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "1",
        "RANK": "16"
    },
    "Sleet showers": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "2",
        "RANK": "19"
    },
    "Heavy sleet showers": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "3",
        "RANK": "22"
    },
    "Light sleet showers and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "1",
        "RANK": "26"
    },
    "Sleet showers and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "2",
        "RANK": "32"
    },
    "Heavy sleet showers and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "3",
        "RANK": "38"
    },
    "Light sleet and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "1",
        "RANK": "27"
    },
    "Sleet and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "2",
        "RANK": "33"
    },
    "Heavy sleet and thunder": {
        "TYPE": "SLEET",
        "TYPE RANK": "4",
        "GROUP RANK": "3",
        "RANK": "39"
    },
    "Light snow": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "1",
        "RANK": "10"
    },
    "Snow": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "2",
        "RANK": "12"
    },
    "Heavy snow": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "3",
        "RANK": "14"
    },
    "Light snow showers": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "1",
        "RANK": "17"
    },
    "Snow showers": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "2",
        "RANK": "20"
    },
    "Heavy snow showers": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "3",
        "RANK": "23"
    },
    "Light snow showers and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "1",
        "RANK": "28"
    },
    "Snow showers and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "2",
        "RANK": "34"
    },
    "Heavy snow showers and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "3",
        "RANK": "40"
    },
    "Light snow and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "1",
        "RANK": "29"
    },
    "Snow and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "2",
        "RANK": "35"
    },
    "Heavy snow and thunder": {
        "TYPE": "SNOW",
        "TYPE RANK": "5",
        "GROUP RANK": "3",
        "RANK": "41"
    }
}


class rankWeather:
    def __init__(self,lat,lon,symbol,temp,wind):
        self.lat=lat
        self.lon=lon
        self.symbol=symbol
        self.temp=temp
        self.wind=wind
    def symbolRank(self):
        symbol=self.symbol
        rankVar=int(WeatherSymbolTable[symbol]['RANK'])

        alfaRank=6
        betaRank=-0.6

        rankValue=1/(1+math.exp(-(alfaRank+betaRank*rankVar)))
        return rankValue

    def temperatureRank(self):
        temp=float(self.temp)

        tempPeak=30
        std=15

        rankValue=math.exp(-0.5*((temp-tempPeak)/std)**2)
        return rankValue

    def windRank(self):
        wind=float(self.wind)

        alfaRank=6
        betaRank=-0.7

        rankValue=1/(1+math.exp(-(alfaRank+betaRank*wind)))
        return rankValue

    def calculate(self):

        symbol=self.symbolRank()
        temp=self.temperatureRank()
        wind=self.windRank()

        totalRank=symbol*0.6+wind*0.2+temp*0.2
        return totalRank
