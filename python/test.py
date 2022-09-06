from math import radians, cos, sin, asin, sqrt, atan2,degrees
from re import I
from unittest import result


def distSpreadEndpoint(distance,angel):
    #Calculates the distance between two adjacent (coordinates) points on the perimeter of the circle
    #https://www.nkhansen.com/loesn_geometri/#trigonometri_oppgave_2

    result=distance*sin(radians(angel))
    print(result)
    return result

def coordinatesMatrix(distance):
    coordinateList=[]
    

    for angels in range(360):
        coordinateList.append([])
        for distancePct in range(100):    
            
            coordinateList[angels].append(str(angels) +'/'+str(distancePct))
    
    print(coordinateList)

coordinatesMatrix(100)