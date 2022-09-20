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
        print(lonEastMid)
        print(lonWestMid)
        print(latNorthMid)
        print(latSouthMid)
        deltaLongitude = lonEastMid - lonWestMid
        deltaLatitude = latNorthMid - latSouthMid
        nrStepsInSquares = int(researchSquares / 2)+1
        # rangeOfLonCoordinates = (1.00 / nrStepsInSquares) * range(1,nrStepsInSquares)
        # fractions = [x for x in np.arange(1 / nrStepsInSquares,1, 1 / nrStepsInSquares)]
        pctStepFrameSize = 1/nrStepsInSquares #pct increase between two points to make frames in map
        lonCoords = [x for x in np.arange(lonWestMid,lonEastMid + pctStepFrameSize * deltaLongitude, pctStepFrameSize * deltaLongitude)]
        latCoords = [x for x in np.arange(latSouthMid,latNorthMid + pctStepFrameSize * deltaLatitude, pctStepFrameSize * deltaLatitude)]
        lon2 = np.linspace(lonWestMid, lonEastMid, nrStepsInSquares)
        lat2 = np.linspace(latSouthMid, latNorthMid, nrStepsInSquares)

        # combinedMatrix = np.vstack((lon2, lat2))
        # print(combinedMatrix.T) Add two arrays from same index to one big array with many small
        
        
        lonlatMerge = np.meshgrid(lat2[1::2],lon2[1::2])
        # print(lonlatMerge)

        mat=np.array(lonlatMerge).transpose()
        
        arr = mat
        # print(mat)
        print(arr)
        # print(mat)

        # print(lat2)
        # print(lonCoords)
        # print(lonWestMid)
        # print(lonEastMid)
        return "Hei"



startPoint=[59.9139,10.7522]

instantiate = GetCoordinates(startPoint)
print(instantiate.retrieveLonLine())