import pyodbc
import pandas as pd


class Handler:
    def __init__(self,config,date, top = 10,groups=10):

       self.input=config["db"]
       self.server=config["server"]
       self.db=config["db"]
       self.username =config["username"]
       self.password=config["password"]
       self.driver=config["driver"]
       self.date=date
       self.top = top
       self.groups=groups


    def bestLocations_response_sql(self):

       database=self.db
       driver=self.driver
       password=self.password
       server=self.server
       username=self.username

       conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
       cursor = conn.cursor()
       sql='''

               Declare @xdate as datetime
               Declare @observations as int
               Declare @tranch as float

               Set @xdate=?
               Set @observations=?
               Set @tranch=?               


               SELECT TOP (@observations) [lat]
                     ,[lon]
                     ,[date]
                     ,[group_rank]
                  ,Ceiling(row_number() over (order by group_rank desc)*@tranch/@observations) as GroupCluster
               FROM [dbo].[weather_forecast_global]
               where date=@xdate
               
       '''

       # HERE THE EXEUCTION HAPPENS, TIME LAG
       cursor.execute(sql,self.date,self.top,self.groups)
       data = cursor.fetchall()

       df = pd.DataFrame(data)
       conn.commit()
       empty_df_schema=pd.DataFrame(columns=['lat','lon','rank','cluster'])

       for index, row in df.iterrows():
          empty_df_schema.loc[index,'lat']=row[0][0]
          empty_df_schema.loc[index,'lon']=row[0][1]
          empty_df_schema.loc[index,'rank']=row[0][3]
          empty_df_schema.loc[index,'cluster']=row[0][4]
       return empty_df_schema