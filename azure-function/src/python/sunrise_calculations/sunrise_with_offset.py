from skyfield import api, almanac
from datetime import datetime, timedelta
import pandas as pd


def timeinSecondsDelta(StartDate,EndDate):
        s_time=StartDate.time()
        e_time=EndDate.time()

        start_seconds=s_time.hour*3600+s_time.minute*60+s_time.second
        end_seconds=e_time.hour*3600+e_time.minute*60+e_time.second

        return end_seconds-start_seconds

def main(latitude: str, longitude: str,ts: api.load.timescale,model,offset_date):
    
    referenceDate = datetime.now()
    date_format_full="%Y-%m-%dT%H:%M:%SZ"
    bluffton = api.wgs84.latlon(float(latitude), float(longitude))

    sunrise_times= []
    sunset_times = []
    dates=[]

    try:

        for i in range(4):

            # Calculate startpoint and values for sunrise sunset
            referenceDate_start_t0=referenceDate
            referenceDate_start_t1=referenceDate+timedelta(days=1)

            start_t0 = ts.utc(referenceDate_start_t0.year, referenceDate_start_t0.month, referenceDate_start_t0.day)
            start_t1 = ts.utc(referenceDate_start_t1.year, referenceDate_start_t1.month, referenceDate_start_t1.day)

            t, y = almanac.find_discrete(start_t0, start_t1, almanac.sunrise_sunset(model, bluffton))

            sunrise_date_full_start=datetime.strptime(t.utc_iso()[0],date_format_full)
            sunset_date_full_start=datetime.strptime(t.utc_iso()[1],date_format_full)

            # Calculate startpoint and values for sunrise sunset x number of days after
            referenceDate_end_t0=referenceDate+timedelta(days=offset_date-1)
            referenceDate_end_t1=referenceDate+timedelta(days=offset_date)

            end_t0 = ts.utc(referenceDate_end_t0.year, referenceDate_end_t0.month, referenceDate_end_t0.day)
            end_t1 = ts.utc(referenceDate_end_t1.year, referenceDate_end_t1.month, referenceDate_end_t1.day)

            t, y = almanac.find_discrete(end_t0, end_t1, almanac.sunrise_sunset(model, bluffton))

            sunrise_date_full_end=datetime.strptime(t.utc_iso()[0],date_format_full)
            sunset_date_full_end=datetime.strptime(t.utc_iso()[1],date_format_full)


            #Calculate increment value in range
            sunrise_time_delta=timeinSecondsDelta(sunrise_date_full_start,sunrise_date_full_end)/(offset_date-1)
            sunset_time_delta=timeinSecondsDelta(sunset_date_full_start,sunset_date_full_end)/(offset_date-1)

            
            for step_date in range(offset_date):
                
                if step_date>0:
                    sunrise_date_full_start += timedelta(days=1,seconds=sunrise_time_delta)
                    sunset_date_full_start += timedelta(days=1,seconds=sunset_time_delta)

                sunrise_times.append(str(sunrise_date_full_start.time()).split(".")[0])
                sunset_times.append(str(sunset_date_full_start.time()).split(".")[0])
                dates.append(sunrise_date_full_start.date())

            sunrise_date_full_start += timedelta(days=1,seconds=sunrise_time_delta)
            sunset_date_full_start += timedelta(days=1,seconds=sunset_time_delta)

            referenceDate=sunrise_date_full_start
        
        df = pd.DataFrame({
            'lat': latitude,
            'lon': longitude,
            'date': dates,
            'sunrise_date': sunrise_times,
            'sunset_date': sunset_times,
            'local_time' : "+00:00"
        })

        return df
    except:
        print("something went wrong with collecting sunrise and sunset")