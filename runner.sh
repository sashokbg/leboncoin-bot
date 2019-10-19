#!/bin/sh

mkdir -p logs

/usr/bin/node ./src/index-leboncoin.js >> ./logs/leboncoin-bot.log 2>&1
/usr/bin/node ./src/index-seloger.js >> ./logs/seloger-bot.log 2>&1

