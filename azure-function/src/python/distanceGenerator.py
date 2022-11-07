global speedList

speedList= {
    "BIKE": 10,
    "CAR" : 40,
    "WALK": 5,
    "PUBLIC TRANSPORT": 15
    }


class GetDistance:

    def __init__(self,travelTime,transportationMethod):
        self.travelTime=travelTime
        self.transportationMethod=transportationMethod

    def calculateDistance(self):
        travelTime=self.travelTime
        transportationMethod=self.transportationMethod


        if transportationMethod.upper() in speedList.keys():
            travelSpeed=speedList[transportationMethod.upper()]

            if not any(char.isalpha() for char in travelTime):
                totalDistance=int(travelSpeed*(int(travelTime.split(":")[0])+int(travelTime.split(":")[1])/60)) #todoo better to do/fetch check etc with googlemaps distance and time
            else:
                raise Exception("time input not working")

        else:
            raise Exception ("transportation method not recognized")


        return totalDistance
