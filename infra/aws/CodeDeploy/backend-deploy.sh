#!/bin/bash
cd /home/ec2-user/backend
docker build -t my-backend-app .
docker stop my-backend-container
docker rm my-backend-container
docker run -d -p 8080:8080 --name my-backend-container my-backend-app