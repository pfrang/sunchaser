import logging
import azure.functions as func
import os
from src.python.Sql_connection.YR_Daily_Update.handlerYr import Handler
from src.python.Sql_connection.YR_Daily_Update.addResultAzureBlob import Handler as BLOB

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        req_body = req.get_json()
        params = req_body["params"]

        server = os.getenv('SQL_Server')
        db = os.getenv('SQL_Database')
        username = os.getenv('SQL_Username')
        password = os.getenv('SQL_Password')
        driver = os.getenv('SQL_Driver')

        config = {
            "server": server,
            "db": db,
            "username": username,
            "password": password,
            "driver": driver
        }

        update={
            "suntime":"Suntime not updated",
            "weather":"Weather not updated",
            "rank":"Rank not updated",
            "delete":"Nothing is deleted",

        }
        SQL_workflow=False
        BLOB_workflow=False
        for i in params['routine']:
            if "BLOB" in i:
                BLOB_workflow=True
            if "SQL" in i:
                SQL_workflow=True

        if SQL_workflow==BLOB_workflow==False:
            return func.HttpResponse(f"No rutine specified for SQL:{SQL_workflow} and BLOB:{BLOB_workflow}", status_code=405)

        for i in params['update']:
            if "suntime" in i:
                response=Handler(config,BLOB_workflow,SQL_workflow).updateSunsetSunrise()
                if BLOB_workflow==True:
                    response=BLOB(i,response).pushToBlob()

            elif "weather" in i:
                response = Handler(config,BLOB_workflow,SQL_workflow).updateWeatherForecast()
                if BLOB_workflow==True:
                    response=BLOB(i,response).pushToBlob()
            elif "rank" in i:
                response = Handler(config,BLOB_workflow,SQL_workflow).updateWeatherRank()

            elif "delete" in i:
                response = Handler(config,BLOB_workflow,SQL_workflow).deleteOldData()

            else: return func.HttpResponse(f"update type {i} not allowed. {update['suntime']}, {update['weather']}, {update['rank']}", status_code=405)
            update.update({i:response})

        response=update

        return func.HttpResponse(f'{response}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)
