FROM python:3.10-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN apt-get update && \
  apt-get install -y build-essential unixodbc-dev libicu63 && \
  pip install --no-cache-dir virtualenv && \
  virtualenv .venv_new && \
  . .venv_new/bin/activate && \
  pip install --no-cache-dir -r requirements.txt

# Install Azure Functions Core Tools
RUN apt-get update && \
  apt-get install -y curl && \
  curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs && \
  npm i -g azure-functions-core-tools@4 --unsafe-perm true

# Install msodbcsql17 and mssql-tools
RUN apt-get update && \
  apt-get install -y gnupg2 && \
  curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
  curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
  apt-get update && \
  ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools && \
  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc && \
  /bin/bash -c "source ~/.bashrc"

# Make port 80 available to the world outside this container
EXPOSE 7071

# Run the command to start the app when the container launches
CMD [ "bash", "-c", "source .venv_new/bin/activate && func start" ]
