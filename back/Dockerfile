FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1

COPY ./back/requirements.txt /requirements.txt

RUN apt-get update && \
    apt-get install -y postgresql-client libjpeg62-turbo-dev gcc libc6-dev libpq-dev zlib1g-dev && \
    pip install -r /requirements.txt && \
    apt-get clean && rm -rf /var/lib/apt/lists/* 

WORKDIR /back

COPY . /back