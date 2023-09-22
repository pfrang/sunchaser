from skyfield import api, almanac
from datetime import datetime, timedelta
import pandas as pd


def main(latitude: str, longitude: str,ts: api.load.timescale, model , days_ahead=15) -> pd.DataFrame:

    # Get the current date
    current_date = datetime.now()
    date_format_full="%Y-%m-%dT%H:%M:%SZ"

    bluffton = api.wgs84.latlon(float(latitude), float(longitude))
    sunrise_times= []
    sunset_times = []
    dates=[]

    for i in range(0, days_ahead):
        current_date_i = current_date + timedelta(days=i)
        current_date_i_1 = current_date + timedelta(days=i + 1)
        t0 = ts.utc(current_date_i.year, current_date_i.month, current_date_i.day)
        t1 = ts.utc(current_date_i_1.year, current_date_i_1.month, current_date_i_1.day)
        t, y = almanac.find_discrete(t0, t1, almanac.sunrise_sunset(model, bluffton))
        sunrise_date = datetime.strptime(t.utc_iso()[0], date_format_full)
        sunset_date = datetime.strptime(t.utc_iso()[1], date_format_full)
        sunrise_2_hours = sunrise_date + timedelta(hours=2)
        sunset_2_hours = sunset_date + timedelta(hours=2)
        sunrise_times.append(str(sunrise_2_hours).split(" ")[1][:5])
        sunset_times.append(str(sunset_2_hours).split(" ")[1][:5])
        dates.append(current_date_i.date())

    df = pd.DataFrame({
            'lat': latitude,
            'lon': longitude,
            'date': dates,
            'sunrise_date': sunrise_times,
            'sunset_date': sunset_times,
            'local_time' : "+00:00"
        })


    return df
