# This function is not intended to be invoked directly. Instead it will be
# triggered by an orchestrator function.
# Before running this sample, please:
# - create a Durable orchestration function
# - create a Durable HTTP starter function
# - add azure-functions-durable to requirements.txt
# - run pip install -r requirements.txt

import logging
import time
from WeatherResult import main

def main(name: str) -> str:
    logging.info(f'Done with {name}')
    return f"Hello {name}!"
