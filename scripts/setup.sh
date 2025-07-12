#!/bin/sh

# Install dependencies locked in package-lock.json
npm ci

# Copy .env.local from example if missing
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "✅ .env.local creado"
fi

# Reset and seed local database
npm run refresh-db

# Run lint, format and tests
npm run check
