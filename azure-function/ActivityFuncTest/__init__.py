# This function is not intended to be invoked directly. Instead it will be
# triggered by an orchestrator function.
# Before running this sample, please:
# - create a Durable orchestration function
# - create a Durable HTTP starter function
# - add azure-functions-durable to requirements.txt
# - run pip install -r requirements.txt

import json
import logging
import time
import requests

def main(name: str) -> str:
    url = "http://localhost:7071/api/WeatherResult"  # Replace with the appropriate URL for the WeatherResult function

    headers = {
        "Content-Type": "application/json"
    }
    body = name
    print("name type", type(body))
    if(type(body) != dict):
        return "Please send a json body"

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        # Process the result as needed
        return response.status_code
    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        print(f"Error from Python: {e}")
        return f"Error from Python: {e}"


    return f"Hello {name}!"
