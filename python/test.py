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



def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance in kilometers between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    return c * radiusEarth