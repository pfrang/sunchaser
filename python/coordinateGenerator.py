from math import radians, cos, sin, asin, sqrt, atan2,degrees
from tracemalloc import start
import numpy as np

global radiusEarth # Radius of earth in kilometers.
radiusEarth=6371

class GetCoordinates:
    def __init__(self, startingCoordinates):
        self.startingCoordinates = startingCoordinates
    
    def retriveNewPointFromStartPoint(self,degree,distanceInKm):

        startingLat = self.startingCoordinates[0]
        startingLon = self.startingCoordinates[1]

        brng=radians(degree)
        #brng = 1.57 (Bearing is 90 degrees converted to radians).
        #d = Distance in km

        radiansLat = radians(startingLat) #Current lat point converted to radians
        raidansLon = radians(startingLon) #Current long point converted to radians

        lat2 = asin( sin(radiansLat)*cos(distanceInKm/radiusEarth) +
        cos(radiansLat)*sin(distanceInKm/radiusEarth)*cos(brng))

        lon2 = raidansLon + atan2(sin(brng)*sin(distanceInKm/radiusEarth)*cos(radiansLat),
                cos(distanceInKm/radiusEarth)-sin(radiansLat)*sin(lat2))

        degreesLat = degrees(lat2)
        degreesLon = degrees(lon2)

        return degreesLat,degreesLon

    def retrieveEdgePoints(self):
        northMid=self.retriveNewPointFromStartPoint(degree=0,distanceInKm =5)
        eastMid=self.retriveNewPointFromStartPoint(degree=90,distanceInKm=5)
        southMid=self.retriveNewPointFromStartPoint(degree=180,distanceInKm=5)
        westMid=self.retriveNewPointFromStartPoint(degree=270,distanceInKm=5)

        edgePoints = {
            "northMid": northMid,
            "eastMid": eastMid,
            "southMid": southMid,
            "westMid": westMid
        }

        return edgePoints
    
    def retrieveLonLine(self,researchSquares=16):
        edgePoints = self.retrieveEdgePoints()
        lonEastMid = edgePoints["eastMid"][1]
        lonWestMid = edgePoints["westMid"][1]
        latNorthMid = edgePoints["northMid"][0]
        latSouthMid = edgePoints["southMid"][0]
        deltaLongitude = lonEastMid - lonWestMid
        deltaLatitude = latNorthMid - latSouthMid
        nrStepsInSquares = researchSquares / 2.0
        # rangeOfLonCoordinates = (1.00 / nrStepsInSquares) * range(1,nrStepsInSquares)
        # fractions = [x for x in np.arange(1 / nrStepsInSquares,1, 1 / nrStepsInSquares)]
        lonCoords = [x for x in np.arange(lonWestMid,lonEastMid + (1 / nrStepsInSquares) * deltaLongitude, (1 / nrStepsInSquares) * deltaLongitude)]
        print(lonCoords)
        print(lonEastMid)
        print(lonWestMid)
        return "Hei"



startPoint=[59.9139,10.7522]

instantiate = GetCoordinates(startPoint)
print(instantiate.retrieveLonLine())