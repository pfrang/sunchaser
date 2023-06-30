# This function is not intended to be invoked directly. Instead it will be
# triggered by an orchestrator function.
# Before running this sample, please:
# - create a Durable orchestration function
# - create a Durable HTTP starter function
# - add azure-functions-durable to requirements.txt
# - run pip install -r requirements.txt

import requests
import os
from src.python.utils.write_to_file import write_to_file



def main(name: str) -> str:
    url = "http://localhost:7071/api/DailyYrApi"  # Replace with the appropriate URL for the WeatherResult function
    script_dir = os.path.dirname(__file__)
    rel_path = "../logs/logs.txt"
    abs_file_path = os.path.join(script_dir, rel_path)
    headers = {
        "Content-Type": "application/json"
    }
    body = name
    if(type(body) != dict):
        return "Please send a json body"

    write_to_file(abs_file_path, body, "Starting processing...", False)

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        write_to_file(abs_file_path, f"Completed request l0l : {response.status_code + response.reason}", False)
        return response.status_code
    except requests.exceptions.RequestException as e:
        write_to_file(abs_file_path, False, f"Error l0l: {e}")

        # Handle request exceptions
        print(f"Error from Python: {e}")
        return f"Error from Python: {e}"
