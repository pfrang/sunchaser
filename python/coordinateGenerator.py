from math import radians, cos, sin, asin, sqrt, atan2,degrees


global radiusEarth # Radius of earth in kilometers.
radiusEarth=6371

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

def newCoordinate(lat1,lon1,degree,d):

    brng=radians(degree)
    #brng = 1.57 (Bearing is 90 degrees converted to radians).
    #d = Distance in km

    lat1 = radians(lat1) #Current lat point converted to radians
    lon1 = radians(lon1) #Current long point converted to radians

    lat2 = asin( sin(lat1)*cos(d/radiusEarth) +
     cos(lat1)*sin(d/radiusEarth)*cos(brng))

    lon2 = lon1 + atan2(sin(brng)*sin(d/radiusEarth)*cos(lat1),
             cos(d/radiusEarth)-sin(lat1)*sin(lat2))

    lat2 = degrees(lat2)
    lon2 = degrees(lon2)

    return lat2,lon2

    
def coordinatesMatrix(distance,lat1,lon1):
    coordinateList=[]
    

    for angels in range(360):
        coordinateList.append([])
        for distancePct in range(100):    
            
            newCor=newCoordinate(lat1,lon1,angels,(distance*distancePct)/100)

            coordinateList[angels].append(str(newCor))
    
    #print(coordinateList[1][50])
    #[a][b] |a=angel b=pct of distance
    #print(newCoordinate(59.9139,10.7522,1,500))

coordinatesMatrix(1000,59.9139,10.7522)

