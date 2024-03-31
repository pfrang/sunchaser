import os

class APISOURCE:

    def getUserAgent():
        # contactInfo = os.getenv('EMAIL_CONTACT')
        return f'Hjemmeprosjekt {1+1}'


    def getKartverket(params=True):

        baseUrl='https://ws.geonorge.no/stedsnavn/v1/punkt'

        api_keys={

        'koordsys':4258,
        'radius':5000,
        'utkoordsys':4258,
        'treffPerSide':1,
        'side':1,
        'filtrer':'navn.stedsnavn.skrivemåte'

        }

        if params is True:
            baseUrl += '?'
            for i in api_keys.keys():
                baseUrl+= f'{i}={api_keys[i]}&'

        return baseUrl


    def getYR():
        return'https://api.met.no/weatherapi/locationforecast/2.0/compact'


    def getKommune(params=True):

        baseUrl='https://ws.geonorge.no/kommuneinfo/v1/punkt'

        api_keys={

        'koordsys':4258,
        'filtrer':'kommunenavn'

        }

        if params is True:
            baseUrl += '?'
            for i in api_keys.keys():
                baseUrl+= f'{i}={api_keys[i]}&'

        return baseUrl

    def getSunRise():
        return 'https://api.met.no/weatherapi/sunrise/3.0/sun'
