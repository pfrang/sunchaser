from azure.storage.filedatalake import DataLakeFileClient, DataLakeDirectoryClient
from datetime import datetime
import os
import logging
from io import BytesIO
import pandas as pd

class Handler():
    def __init__(self,ApiParamsUpdateRef,offset, step, DataFrame: pd.DataFrame):

        try:
            #Datalak fixed keys
            self.account_name=os.getenv('BLOB_Account_Name')
            self.account_key=os.getenv('BLOB_Account_Key')
            self.file_system_name=os.getenv('BLOB_File_System_Name')
            self.file_path=os.getenv('BLOB_File_Path')

            todays_date = str(datetime.now().date())
            #Dependent variables
            # //update dataFrame to not preservE_index
            self.df= DataFrame
            self.offset = offset
            self.step = step
            self.destination_folder=todays_date
            self.ApiParamsUpdateRef=ApiParamsUpdateRef
            self.parquet_file_name=self.generateFileName()
        except Exception as e:
            raise Exception("Failed to get env vars in blob class")

    def generateFileName(self):
        todays_date_with_time =  datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
        return self.ApiParamsUpdateRef[0:3].upper()+"_"+f'{self.offset}-{self.offset + self.step}'+"_"+todays_date_with_time+".parquet"

    def pushToBlob(self):

        # Azure Data Lake Storage details
        ApiParamsUpdateRef=self.ApiParamsUpdateRef

        configAzure = {
            "account_url": f"https://{self.account_name}.dfs.core.windows.net",
            "file_system_name": self.file_system_name,
            "folder_path": self.destination_folder,
            "file_path": f"{self.destination_folder}/{self.parquet_file_name}",
            "credentials": self.account_key
        }

        try:
            directory_client = DataLakeDirectoryClient(
                account_url=configAzure["account_url"],
                file_system_name=configAzure["file_system_name"],
                directory_name=configAzure["folder_path"],
                credential=configAzure["credentials"]
            )

            if not directory_client.exists():
                directory_client.create_directory()

            parquet_file = BytesIO()
            #start streaming

            # self.df['date'] = pd.to_datetime(self.df['date'])


            self.df.to_parquet(parquet_file, engine='pyarrow')
            parquet_file.seek(0)

            service_client = DataLakeFileClient(account_url=f"{configAzure['account_url']}/",
                file_system_name=configAzure["file_system_name"],
                file_path=configAzure["file_path"],
                credential=configAzure["credentials"])

            service_client.upload_data(data=parquet_file, overwrite=True)

            return(f"File uploaded successfully for {ApiParamsUpdateRef}!")
        except Exception as e:
            raise Exception("Failed on Blob dump")
