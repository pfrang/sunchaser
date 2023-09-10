from skyfield.api import load, wgs84
from datetime import datetime, timedelta

# Define the latitude and longitude of the location
latitude_degrees = 37.7749  # Example: San Francisco, CA
longitude_degrees = -122.4194

# Define the date for which you want to calculate sunrise and sunset
date = datetime(2023, 9, 10)  # Example date: September 10, 2023

# Load the ephemeris data from Skyfield
ts = load.timescale()
eph = load('de421.bsp')

# Create a Topos object for the specified location
location = wgs84.latlon(latitude_degrees, longitude_degrees)

# Calculate the observer object for the specified location
observer = eph.topos(location)

# Calculate the sunrise and sunset times for the specified date
t = ts.utc(date.year, date.month, date.day)
sun = eph['sun']
astrometric = observer.at(t).observe(sun).apparent()
alt, az, d = astrometric.altaz()
sunrise = t[alt.degrees > 0][0]  # First time when the sun is above the horizon
sunset = t[alt.degrees > 0][-1]  # Last time when the sun is above the horizon

# Convert the UTC times to the local time zone if needed
# You may use a library like pytz or dateutil for this conversion

# Print the results
print("Sunrise:", sunrise.utc_datetime())
print("Sunset:", sunset.utc_datetime())
