from math import radians, cos, sin, asin, sqrt, atan2,degrees

import numpy as np
import pandas as pd
import os


global radiusEarth # Radius of earth in kilometers.
radiusEarth=6371



class GetCoordinates:
    def __init__(self, startingCoordinates,distanceInKm=50):
        self.startingCoordinates = startingCoordinates
        self.distanceInKm=distanceInKm

    def retriveNewPointFromStartPoint(self,degree):
        distanceInKm=self.distanceInKm
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

        northMid=self.retriveNewPointFromStartPoint(degree=0)
        eastMid=self.retriveNewPointFromStartPoint(degree=90)
        southMid=self.retriveNewPointFromStartPoint(degree=180)
        westMid=self.retriveNewPointFromStartPoint(degree=270)

        edgePoints = {
            "northMid": northMid,
            "eastMid": eastMid,
            "southMid": southMid,
            "westMid": westMid
        }

        return edgePoints

    def retrieveMatrix(self,researchSquares=256):
        if not (sqrt(researchSquares) / 4).is_integer():
            raise ValueError("Number must be root, divided by 4 = whole number")

        edgePoints = self.retrieveEdgePoints()
        lonEastMid = edgePoints["eastMid"][1]
        lonWestMid = edgePoints["westMid"][1]
        latNorthMid = edgePoints["northMid"][0]
        latSouthMid = edgePoints["southMid"][0]
        nrStepsInSquares = int(sqrt(researchSquares)*2)+1
        lon2 = np.linspace(lonWestMid, lonEastMid, nrStepsInSquares)
        lat2 = np.linspace(latSouthMid, latNorthMid, nrStepsInSquares)
        lonlatMerge = np.meshgrid(lat2[1::2],lon2[1::2])

        transposedMatrix = np.array(lonlatMerge).transpose()
        transposedMatrix=transposedMatrix.reshape(-1, *transposedMatrix.shape[-1:]) # flatten all but the last one dimension - last -1. the first is the shape(?):
        df_transposedMatrix = pd.DataFrame(transposedMatrix, columns = ['lat','lon'])
        
        df_transposedMatrix.loc[len(df_transposedMatrix.index)] = [self.startingCoordinates[0],self.startingCoordinates[1]]
        # print(f"{researchSquares} coordinates generated")
        return df_transposedMatrix.round(2).drop_duplicates(keep='last')
    def saveOutput(self):
        inputdataframe=self.retrieveMatrix()
        os.remove("test.csv")

        inputdataframe.to_csv("test.csv",sep=',')
        return


