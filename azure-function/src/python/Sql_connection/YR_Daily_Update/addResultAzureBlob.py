from azure.storage.filedatalake import DataLakeFileClient
import pandas as pd
import pyarrow.parquet as pq
from datetime import datetime
import os
import logging

class Handler():
    def __init__(self,ApiParamsUpdateRef,jsonFile):

        try:
            #Datalak fixed keys
            self.account_name=os.getenv('BLOB_Account_Name')
            self.account_key=os.getenv('BLOB_Account_Key')
            self.file_system_name=os.getenv('BLOB_File_System_Name')
            self.file_path=os.getenv('BLOB_File_Path')

            #Dependent variables
            self.json=jsonFile
            self.destination_folder=str(datetime.now().date())
            self.json_parquet_name=ApiParamsUpdateRef[0:3].upper()+"_"+str(datetime.now()).replace(":","").replace(".","")+".parquet"
            self.ApiParamsUpdateRef=ApiParamsUpdateRef
        except Exception as e:
            logging.info(e)
            return(f"Error: {e}")

    def pushToBlob(self):
        
        try:
            # Azure Data Lake Storage details 
            account_name = self.account_name 
            account_key = self.account_key 
            file_system_name = self.file_system_name 
            destination_folder = self.destination_folder 
            file_name = self.json
            ApiParamsUpdateRef=self.ApiParamsUpdateRef
            
            # Convert JSON to Parquet 
            parquet_file_name = self.json_parquet_name 
            pq.write_table(pq.Table.from_pandas(file_name), parquet_file_name) 
            
            # Upload Parquet file to Azure Data Lake Storage 
            service_client = DataLakeFileClient(account_url=f"https://{account_name}.dfs.core.windows.net", 
                file_system_name=file_system_name, 
                file_path=f"{destination_folder}/{parquet_file_name}", 
                credential=account_key) 
            
            with open(parquet_file_name, 'rb') as file: 
                service_client.upload_data(file, overwrite=True)
            
            return(f"File uploaded successfully for {ApiParamsUpdateRef}!")
        except Exception as e:
            logging.info(e)
            return(f"Error: {e}")
