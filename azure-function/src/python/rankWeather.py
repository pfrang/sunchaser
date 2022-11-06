
import math


global WeatherSymbolTable

WeatherSymbolTable={
"clearsky": {
    "desc_en": "Clear sky",
    "desc_nb": "Klarvær",
    "desc_nn": "Klårvêr",
    "RANK": "1",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"cloudy": {
    "desc_en": "Cloudy",
    "desc_nb": "Skyet",
    "desc_nn": "Skya",
    "RANK": "4",
    "variants": "null"
},
"fair": {
    "desc_en": "Fair",
    "desc_nb": "Lettskyet",
    "desc_nn": "Lettskya",
    "RANK": "2",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"fog": {
    "desc_en": "Fog",
    "desc_nb": "Tåke",
    "desc_nn": "Skodde",
    "RANK": "15",
    "variants": "null"
},
"heavyrain": {
    "desc_en": "Heavy rain",
    "desc_nb": "Kraftig regn",
    "desc_nn": "Kraftig regn",
    "RANK": "10",
    "variants": "null"
},
"heavyrainandthunder": {
    "desc_en": "Heavy rain and thunder",
    "desc_nb": "Kraftig regn og torden",
    "desc_nn": "Kraftig regn og torevêr",
    "RANK": "11",
    "variants": "null"
},
"heavyrainshowers": {
    "desc_en": "Heavy rain showers",
    "desc_nb": "Kraftige regnbyger",
    "desc_nn": "Kraftige regnbyer",
    "RANK": "41",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"heavyrainshowersandthunder": {
    "desc_en": "Heavy rain showers and thunder",
    "desc_nb": "Kraftige regnbyger og torden",
    "desc_nn": "Kraftige regnbyer og torevêr",
    "RANK": "25",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"heavysleet": {
    "desc_en": "Heavy sleet",
    "desc_nb": "Kraftig sludd",
    "desc_nn": "Kraftig sludd",
    "RANK": "48",
    "variants": "null"
},
"heavysleetandthunder": {
    "desc_en": "Heavy sleet and thunder",
    "desc_nb": "Kraftig sludd og torden",
    "desc_nn": "Kraftig sludd og torevêr",
    "RANK": "32",
    "variants": "null"
},
"heavysleetshowers": {
    "desc_en": "Heavy sleet showers",
    "desc_nb": "Kraftige sluddbyger",
    "desc_nn": "Kraftige sluddbyer",
    "RANK": "43",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"heavysleetshowersandthunder": {
    "desc_en": "Heavy sleet showers and thunder",
    "desc_nb": "Kraftige sluddbyger og torden",
    "desc_nn": "Kraftige sluddbyer og torevêr",
    "RANK": "27",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"heavysnow": {
    "desc_en": "Heavy snow",
    "desc_nb": "Kraftig snø",
    "desc_nn": "Kraftig snø",
    "RANK": "50",
    "variants": "null"
},
"heavysnowandthunder": {
    "desc_en": "Heavy snow and thunder",
    "desc_nb": "Kraftig snø og torden",
    "desc_nn": "Kraftig snø og torevêr",
    "RANK": "34",
    "variants": "null"
},
"heavysnowshowers": {
    "desc_en": "Heavy snow showers",
    "desc_nb": "Kraftige snøbyger",
    "desc_nn": "Kraftige snøbyer",
    "RANK": "45",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"heavysnowshowersandthunder": {
    "desc_en": "Heavy snow showers and thunder",
    "desc_nb": "Kraftige snøbyger og torden",
    "desc_nn": "Kraftige snøbyer og torevêr",
    "RANK": "29",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightrain": {
    "desc_en": "Light rain",
    "desc_nb": "Lett regn",
    "desc_nn": "Lett regn",
    "RANK": "46",
    "variants": "null"
},
"lightrainandthunder": {
    "desc_en": "Light rain and thunder",
    "desc_nb": "Lett regn og torden",
    "desc_nn": "Lett regn og torevêr",
    "RANK": "30",
    "variants": "null"
},
"lightrainshowers": {
    "desc_en": "Light rain showers",
    "desc_nb": "Lette regnbyger",
    "desc_nn": "Lette regnbyer",
    "RANK": "40",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightrainshowersandthunder": {
    "desc_en": "Light rain showers and thunder",
    "desc_nb": "Lette regnbyger og torden",
    "desc_nn": "Lette regnbyer og torevêr",
    "RANK": "24",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightsleet": {
    "desc_en": "Light sleet",
    "desc_nb": "Lett sludd",
    "desc_nn": "Lett sludd",
    "RANK": "47",
    "variants": "null"
},
"lightsleetandthunder": {
    "desc_en": "Light sleet and thunder",
    "desc_nb": "Lett sludd og torden",
    "desc_nn": "Lett sludd og torevêr",
    "RANK": "31",
    "variants": "null"
},
"lightsleetshowers": {
    "desc_en": "Light sleet showers",
    "desc_nb": "Lette sluddbyger",
    "desc_nn": "Lette sluddbyer",
    "RANK": "42",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightsnow": {
    "desc_en": "Light snow",
    "desc_nb": "Lett snø",
    "desc_nn": "Lett snø",
    "RANK": "49",
    "variants": "null"
},
"lightsnowandthunder": {
    "desc_en": "Light snow and thunder",
    "desc_nb": "Lett snø og torden",
    "desc_nn": "Lett snø og torevêr",
    "RANK": "33",
    "variants": "null"
},
"lightsnowshowers": {
    "desc_en": "Light snow showers",
    "desc_nb": "Lette snøbyger",
    "desc_nn": "Lette snøbyer",
    "RANK": "44",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightssleetshowersandthunder": {
    "desc_en": "Light sleet showers and thunder",
    "desc_nb": "Lette sluddbyger og torden",
    "desc_nn": "Lette sluddbyer og torevêr",
    "RANK": "26",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"lightssnowshowersandthunder": {
    "desc_en": "Light snow showers and thunder",
    "desc_nb": "Lette snøbyger og torden",
    "desc_nn": "Lette snøbyer og torevêr",
    "RANK": "28",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"partlycloudy": {
    "desc_en": "Partly cloudy",
    "desc_nb": "Delvis skyet",
    "desc_nn": "Delvis skya",
    "RANK": "3",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"rain": {
    "desc_en": "Rain",
    "desc_nb": "Regn",
    "desc_nn": "Regn",
    "RANK": "9",
    "variants": "null"
},
"rainandthunder": {
    "desc_en": "Rain and thunder",
    "desc_nb": "Regn og torden",
    "desc_nn": "Regn og torevêr",
    "RANK": "22",
    "variants": "null"
},
"rainshowers": {
    "desc_en": "Rain showers",
    "desc_nb": "Regnbyger",
    "desc_nn": "Regnbyer",
    "RANK": "5",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"rainshowersandthunder": {
    "desc_en": "Rain showers and thunder",
    "desc_nb": "Regnbyger og torden",
    "desc_nn": "Regnbyer og torevêr",
    "RANK": "6",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"sleet": {
    "desc_en": "Sleet",
    "desc_nb": "Sludd",
    "desc_nn": "Sludd",
    "RANK": "12",
    "variants": "null"
},
"sleetandthunder": {
    "desc_en": "Sleet and thunder",
    "desc_nb": "Sludd og torden",
    "desc_nn": "Sludd og torevêr",
    "RANK": "23",
    "variants": "null"
},
"sleetshowers": {
    "desc_en": "Sleet showers",
    "desc_nb": "Sluddbyger",
    "desc_nn": "Sluddbyer",
    "RANK": "7",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"sleetshowersandthunder": {
    "desc_en": "Sleet showers and thunder",
    "desc_nb": "Sluddbyger og torden",
    "desc_nn": "Sluddbyer og torevêr",
    "RANK": "20",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"snow": {
    "desc_en": "Snow",
    "desc_nb": "Snø",
    "desc_nn": "Snø",
    "RANK": "13",
    "variants": "null"
},
"snowandthunder": {
    "desc_en": "Snow and thunder",
    "desc_nb": "Snø og torden",
    "desc_nn": "Snø og torevêr",
    "RANK": "14",
    "variants": "null"
},
"snowshowers": {
    "desc_en": "Snow showers",
    "desc_nb": "Snøbyger",
    "desc_nn": "Snøbyer",
    "RANK": "8",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
},
"snowshowersandthunder": {
    "desc_en": "Snow showers and thunder",
    "desc_nb": "Snøbyger og torden",
    "desc_nn": "Snøbyer og torevêr",
    "RANK": "21",
    "variants": [
    "day",
    "night",
    "polartwilight"
    ]
}
}



class rankWeather:
    def __init__(self,row):
        self.symbol=row['symbol']
        self.temp=row['temperature']
        self.wind=row['wind']
    def symbolRank(self):
        symbol=str(self.symbol).split("_")[0]
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
