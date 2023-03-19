import math
import numpy as np
import pandas as pd
from src.python.coordinatesfilter import ValidCoordinate



#Outlier values of Norway with Nort, South, East, West. This box will be used as a perimter for a square. 
# Inside this square all testpoints will be created.
CountryBoundary={
"Norway": {
    "High_lat": 71.33158076365248,
    "Low_lat": 57.970870972590966,
    "High_lon": 31.91400032386939,
    "Low_lon": 4.297801531771191
}
}

#Same routine as coordinate generator. We use endpoints and tell how many steps should be between two endpoints. 
#The split will be the same for lat and lon. This is inaccurate, as a country can be longer or wider. Higher accuracy improvements must reflect this.
def MeshGrid(squares,country="Norway"):
    High_lat=CountryBoundary[country]["High_lat"]
    Low_lat=CountryBoundary[country]["Low_lat"]
    High_lon=CountryBoundary[country]["High_lon"]
    Low_lon=CountryBoundary[country]["Low_lon"]

    lon2 = np.linspace(Low_lon, High_lon, squares)
    lat2 = np.linspace(Low_lat, High_lat, squares)
    lonlatMerge = np.meshgrid(lat2,lon2)
    
    #should consider removing more than 3 decimals and dropping duplicates.
    transposedMatrix = np.array(lonlatMerge).transpose()
    transposedMatrix=transposedMatrix.reshape(-1, *transposedMatrix.shape[-1:]) # flatten all but the last one dimension - last -1. the first is the shape(?):
    df_transposedMatrix = pd.DataFrame(transposedMatrix, columns = ['lat','lon'])

    return df_transposedMatrix.round(2).drop_duplicates(keep='last') #reducing the decimals to two, and removing duplicates. when dropping the 3.dec each point can not be closer than 1000m. 

def TestMeshGrid(inputVar):
    #This step will used the created mesh-grid and test how many of the points are indised the polygon.
    
    #Creating a meshgrid around norway with x datapoints
    meshTest=MeshGrid(inputVar)
    
    #Testing if points generated are within Norway
    result=[]
    
    for index, row in meshTest.iterrows():
        try:

            CoordinateResult=ValidCoordinate(row['lat'],row['lon']).validateInitialPoint()
            result.append([row["lat"],row['lon']]) #appending valid points to a list, so that we can save and count the reults. the goal is that the lengt of this list should be equal to our target goal.
            
        except Exception as e:
            e
    return result                

#search method for narrowing down "goal seak". Start by two end-values and use the average value. Thereafter reduce the space between the two - until wanted result is obtained.
def BinaryApproximation(LowStart,HighStart,Target):
    inputvar=int(math.sqrt((HighStart+LowStart)*0.5))
    ResultMesh=TestMeshGrid(inputvar)
    TestValue=len(ResultMesh)
    
    

    i=0
    while abs(TestValue-Target)>(Target*0.01) and i<50: #running until we hit target by less than 1% from wanted goal, or until no valid result is found (i=50)
        
        if TestValue>Target:
            HighStart=inputvar**2 #if the return was to high, we lover the high value.
        
        elif TestValue<Target:
            LowStart=inputvar**2 #if the return was to low, we increase the lower value.
        
        inputvar=int(math.sqrt((HighStart+LowStart)*0.5)) #inputvar reflects the number of squares to test for. But when creating the mesh-grid, the input will return the power of 2 results, therefor we need to take sqrt.

        ResultMesh=TestMeshGrid(inputvar)
        TestValue=len(ResultMesh) #Testing the number of points from the mesh-grid that was inside the polygon.
        print("Low: "+str(LowStart) +", High: "+str(HighStart) + ", Target: " + str(TestValue))
        i=i+1
    df=pd.DataFrame(ResultMesh,columns=['lat','lon'])
    
    return df

TargetPoints=20000
d = BinaryApproximation(TargetPoints,TargetPoints*10,TargetPoints)
d.to_csv('mesh.csv')

