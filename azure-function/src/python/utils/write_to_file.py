from datetime import datetime
def write_to_file(file_path, body, response, error):
    now = datetime.now()
    timestamp = now.strftime("%H:%M:%S") + "T" + now.strftime("%Y-%m-%d") + "Z"
    with(open(file_path, "a")) as f:
        f.write(timestamp)
        f.write(f'\t{str(body)}\t')
        if(response):
            f.write(f'{response}')
        if(error):
            f.write(f'\t{error}')
        f.write("\n")
        f.close()
