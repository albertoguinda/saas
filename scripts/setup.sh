#!/bin/sh

# Install dependencies locked in package-lock.json,
# then run lint and tests to verify setup.
npm ci
npm run lint
npm test
