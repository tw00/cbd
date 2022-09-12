#!/bin/bash

sudo docker build . -t tw00/cbd-frontend
sudo docker run --rm -d -p 9000:80 tw00/cbd-frontend
