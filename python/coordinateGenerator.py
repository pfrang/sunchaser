from asyncore import write
from math import radians, cos, sin, asin, sqrt, atan2,degrees
from tkinter import W
from tracemalloc import start
from typing import Any
import numpy as np
import pandas as pd
import os
import re

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
        northMid=self.retriveNewPointFromStartPoint(degree=0,distanceInKm =50)
        eastMid=self.retriveNewPointFromStartPoint(degree=90,distanceInKm=50)
        southMid=self.retriveNewPointFromStartPoint(degree=180,distanceInKm=50)
        westMid=self.retriveNewPointFromStartPoint(degree=270,distanceInKm=50)

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

        transposedMatrix = np.array(lonlatMerge).transpose().flatten()
        
        
        
        # print(transposedMatrix.flatten())
        #a = []

        # for index,i in enumerate(transposedMatrix):
        #     tmp_arr = [i, transposedMatrix[index+1]]
        #     a.append(tmp_arr)
        #     index=index+2

        # return a
        
    
    def saveOutput(self):
        inputArray=self.retrieveMatrix()  
        # print(inputArray)
        os.remove("test.csv")

        f = open("test.csv", "a")
        for x in inputArray:
            x=str(x).replace("[[","")
            x=str(x).replace(" [","")
            x=str(x).replace("]]","")
            x=str(x).replace("]","")
            x=str(x).replace(" ",",")
            x=str(x).replace(",,",",")
            x=str(x).replace(",,",",")
            f.write(str(x).strip()+'\n')
        f.close()

        return "Hei"



startPoint=[59.9139,10.7522]

instantiate = GetCoordinates(startPoint)
print(instantiate.retrieveMatrix())
# instantiate.saveOutput()
#print(instantiate.retrieveLonLine())