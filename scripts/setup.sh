#!/bin/sh

# Prepare local environment:
# 1. install dependencies
# 2. copy .env.example if .env.local is missing
# 3. seed the database

npm ci

if [ ! -f .env.local ] && [ -f .env.example ]; then
  cp .env.example .env.local
fi

npm run refresh-db
