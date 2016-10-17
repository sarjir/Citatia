#!/bin/bash

set -eu

docker exec -it `docker ps | grep linusljung/node-web | awk '{print $1}'` bash
