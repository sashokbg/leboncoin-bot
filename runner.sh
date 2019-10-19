#!/bin/bash

dirname="$( cd "$( echo "${BASH_SOURCE[0]%/*}" )"; pwd )"

mkdir -p $dirname/logs

/usr/bin/node $dirname/src/index-leboncoin.js >> $dirname/logs/leboncoin-bot.log 2>&1
/usr/bin/node $dirname/src/index-seloger.js >> $dirname/logs/seloger-bot.log 2>&1

