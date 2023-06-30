# This function is not intended to be invoked directly. Instead it will be
# triggered by an HTTP starter function.
# Before running this sample, please:
# - create a Durable activity function (default name is "Hello")
# - create a Durable HTTP starter function
# - add azure-functions-durable to requirements.txt
# - run pip install -r requirements.txt

import logging
import json
import os

import azure.functions as func
import azure.durable_functions as df


def orchestrator_function(context: df.DurableOrchestrationContext):
    body = context.get_input()
    transformed_body = body
    params = body["params"]["update"]
    result1 = ""
    result2 = ""
    result3 = ""
    try:
        if("weather" in params):
            transformed_body_weather = transformed_body
            transformed_body_weather["params"]["update"] = ["weather"]
            result1 = yield context.call_activity('ActivityFuncTest', transformed_body_weather)
        if("suntime" in params):
            transformed_body_suntime = transformed_body
            transformed_body_suntime["params"]["update"] = ["suntime"]
            result2 = yield context.call_activity('ActivityFuncTest', transformed_body_suntime)
        if("rank" in params):
            transformed_body_rank = transformed_body
            transformed_body_rank["params"]["update"] = ["rank"]
            result3 = yield context.call_activity('ActivityFuncTest', transformed_body_rank)
        return [result1, result2, result3]
    except Exception as e:
        return str(e)

main = df.Orchestrator.create(orchestrator_function)
