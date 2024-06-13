import logging
import azure.functions as func
import os
from src.python.YR_API_ROUTINE_NEW.Datacollector import NewData

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    if req.method == "GET":
        return func.HttpResponse("GET is not suported!",status_code=200)


    try:
        req_body = req.get_json()
        params = req_body["params"]

        server = os.getenv('SQL_Server')
        db = os.getenv('SQL_Database')
        username = os.getenv('SQL_Username')
        password = os.getenv('SQL_Password')
        driver = os.getenv('SQL_Driver')

        conn_str = 'DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+db+';UID='+username+';PWD='+ password

        Handler=NewData(conn_str,params)

        response=Handler.get_data_from_yr()

        return func.HttpResponse(f'{response}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)
