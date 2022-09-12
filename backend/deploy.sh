#!/bin/bash

sudo docker build . -t tw00/cbd-backend
sudo docker run --rm -d \
    -p 9300:9300 \
    -v $(pwd)/db:/usr/src/app/db \
    tw00/cbd-backend

