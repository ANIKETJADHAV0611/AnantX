# AnantX Setup Guide

## 1. Clone Repositories

https://github.com/ANIKETJADHAV0611/AnantX.git
git clone https://github.com/vibhorkdew/AnantBuy.git
OB
## 2. Start AnantBuy

cd AnantBuy
docker compose up -d

## 3. Start AnantX

cd ../AnantX
docker compose up -d

## 4. Verify Containers

docker ps

## 5. Access Applications

AnantBuy: http://localhost:4000

AnantX Dashboard: http://localhost:3000

Prometheus: http://localhost:9090

Splunk: http://localhost:8001

## 6. Stop Services

cd AnantX
docker compose down

cd ../AnantBuy
docker compose down

## Note

AnantBuy is the E-Commerce application being monitored.

AnantX is the DevSecOps platform responsible for:
- Monitoring
- Logging
- Runtime Security
- Threat Detection
- Container Visibility
- Security Dashboard
# AnantX
