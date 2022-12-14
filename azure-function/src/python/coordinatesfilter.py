from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

global PolygonMap
PolygonMap={
    "Country":{
        "Norway":{
            "coordinates": [
                [
                [
                    11.0302734,
                    58.9273344
                ],
                [
                    11.2939453,
                    58.9046457
                ],
                [
                    11.7333984,
                    58.9046457
                ],
                [
                    12.5683594,
                    60.3269477
                ],
                [
                    12.4365234,
                    61.5436415
                ],
                [
                    12.3486328,
                    63.2731822
                ],
                [
                    13.7988281,
                    64.0337439
                ],
                [
                    14.9853516,
                    66.0358734
                ],
                [
                    18.28125,
                    68.4153522
                ],
                [
                    19.5556641,
                    68.4153522
                ],
                [
                    20.8740234,
                    69.0371417
                ],
                [
                    21.6210938,
                    69.1781844
                ],
                [
                    22.9394531,
                    68.640555
                ],
                [
                    25.0048828,
                    68.5924866
                ],
                [
                    26.71875,
                    69.8396219
                ],
                [
                    27.8173828,
                    70.0205873
                ],
                [
                    29.3115234,
                    69.7485511
                ],
                [
                    29.7070313,
                    69.9453752
                ],
                [
                    30.9814453,
                    70.4220786
                ],
                [
                    28.9599609,
                    70.9453556
                ],
                [
                    25.0048828,
                    71.1025427
                ],
                [
                    22.9833984,
                    70.7434778
                ],
                [
                    21.3134766,
                    70.1999941
                ],
                [
                    18.8085938,
                    70.1552879
                ],
                [
                    17.2265625,
                    69.5498773
                ],
                [
                    17.0507813,
                    68.9268115
                ],
                [
                    15.9521484,
                    69.2561492
                ],
                [
                    14.4140625,
                    68.5121433
                ],
                [
                    12.9638672,
                    67.8092445
                ],
                [
                    15.9960938,
                    68.2368227
                ],
                [
                    14.6337891,
                    67.373698
                ],
                [
                    12.7441406,
                    66.3022055
                ],
                [
                    11.4697266,
                    64.7553899
                ],
                [
                    8.1298828,
                    63.2138297
                ],
                [
                    4.9658203,
                    61.9596158
                ],
                [
                    4.7021484,
                    61.1220192
                ],
                [
                    5.5371094,
                    58.6312166
                ],
                [
                    7.9101563,
                    57.8914974
                ],
                [
                    10.6347656,
                    59.3331894
                ],
                [
                    11.0302734,
                    58.9273344
                ]
                ]
            ],
            "type": "Polygon"
        }}
        }



class ValidCoordinate:
    def __init__(self,lat,lon,country="Norway"):
        self.lat=lat
        self.lon=lon
        self.country=country

    def validate(self):
        lon=self.lon
        lat=self.lat
        country=self.country

        polygon=Polygon(PolygonMap["Country"][country]["coordinates"][0])
        point = Point(lon, lat)

        return polygon.contains(point)

    def validateInitialPoint(self):
        lon=self.lon
        lat=self.lat
        country=self.country

        polygon=Polygon(PolygonMap["Country"][country]["coordinates"][0])
        point = Point(lon, lat)

        if not polygon.contains(point):
            raise Exception("Startpoint is outside map")