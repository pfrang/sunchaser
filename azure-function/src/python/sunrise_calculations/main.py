from skyfield import api, almanac
from datetime import datetime, timedelta
import pandas as pd

def main(latitude, longitude):
    ts = api.load.timescale()
    eph = api.load('de421.bsp')

    # Get the current date
    current_date = datetime.now()

    # Extract the year, month, and day from the current date
    year = current_date.year
    month = current_date.month
    day = current_date.day
    tomorrow = current_date + timedelta(days=1)

    bluffton = api.wgs84.latlon(latitude, longitude)

    t0 = ts.utc(year, month, day)
    t1 = ts.utc(tomorrow.year, tomorrow.month, tomorrow.day)
    t, y = almanac.find_discrete(t0, t1, almanac.sunrise_sunset(eph, bluffton))
    print(t.utc_iso())
    print(y)

    sunSchedule=pd.DataFrame({
            'lat': lat,
            'lon': lon,
            'date': date,
            'sunrise_date': sunriseDate,
            'sunset_date': sunsetDate,
            'local_time' : offset
        })
    # date_format_full="%Y-%m-%dT%H:%M:%SZ"


# # sunrise =t.utc_iso()[0]

# sunrise = datetime.strptime(t.utc_iso()[0], date_format_full)
# sunset = datetime.strptime(t.utc_iso()[1], date_format_full)
# sunrise_2_hours = sunrise + timedelta(hours=2)
# sunset_2_hours = sunset + timedelta(hours=2)

# print(type(sunrise))
# print(sunrise)
# print(sunrise_2_hours)
# print(sunset_2_hours)
# print(y)
