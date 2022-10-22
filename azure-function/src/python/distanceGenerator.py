global speedList

speedList= {
    "Bike": 10,
    "Car" : 40,
    "Walk": 5,
    "Public Transport": 15
    }


class GetDistance:

    def __init__(self,travelTime,transportationMethod):
        self.travelTime=travelTime
        self.transportationMethod=transportationMethod

    def calculateDistance(self):
        travelTime=self.travelTime
        transportationMethod=self.transportationMethod


        if transportationMethod in speedList.keys():
            travelSpeed=speedList[transportationMethod]

            if not any(char.isalpha() for char in travelTime):
                totalDistance=int(travelSpeed*(int(travelTime.split(":")[0])+int(travelTime.split(":")[1])/60)) #todoo better to do/fetch check etc with googlemaps distance and time
            else:
                totalDistance="time input not working"

        else:
            totalDistance = "transportation method not found"


        return totalDistance
