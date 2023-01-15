import pyodbc 

server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'   
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()
try:

    cursor.execute('''
		CREATE TABLE Weather_data (
            id INT IDENTITY(1,1),
            lat DECIMAL(8,4),
            lon DECIMAL(8,4),
            date DATE,
            time TIME,
            weather_symbol_id_fk Int FOREIGN KEY REFERENCES Rank_data(weather_symbol_id),
            temperature DECIMAL(7,4),
            wind DECIMAL(6,4),
            score DECIMAL(7,4),
            src VARCHAR(50),
            created_at DATETIME2 DEFAULT SYSDATETIME(),
			)
		''')
    conn.commit()
except Exception as e:
    print(e)
    