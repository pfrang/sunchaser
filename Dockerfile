# Only for frontend
# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN yarn install
# COPY . .
# RUN yarn build
# EXPOSE 3000
# CMD ["yarn", "start"]


# Build the frontend
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json .
COPY next-env.d.ts .
COPY next.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY public ./public
COPY .env .
COPY postcss.config.js .
COPY src ./src

# Copy from backend
FROM python:3.10-slim-buster AS backend
WORKDIR /app
COPY ./azure-function .

# Final image
FROM node:20-buster-slim
# Set the working directory
WORKDIR /app

RUN apt-get update && apt-get install -y python3-pip build-essential unixodbc-dev libicu63 zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
# Install Python 3.10.13
RUN wget https://www.python.org/ftp/python/3.10.13/Python-3.10.13.tgz && \
  tar xvf Python-3.10.13.tgz && \
  cd Python-3.10.13 && \
  ./configure --enable-optimizations && \
  make -j 8 && \
  make altinstall && \
  echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
# OS Dependencies
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
  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
# Copy the frontend and backend
COPY --from=frontend /app ./frontend
COPY --from=backend /app ./backend

# Build frontend
RUN cd ./frontend && \
  yarn install && \
  yarn next build
# Install Python dependencies & activate venv
RUN cd ./backend && \
  python3.10 -m pip install --no-cache-dir virtualenv && \
  python3.10 -m virtualenv .venv_new && \
  . .venv_new/bin/activate && \
  python3.10 -m pip install --no-cache-dir -r requirements.txt

EXPOSE 3000 7071

CMD [ "bash", "-c", "source ~/.bashrc && cd frontend && yarn next start & cd backend && source .venv_new/bin/activate && func start" ]
