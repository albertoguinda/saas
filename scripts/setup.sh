#!/bin/sh

# Always install dev dependencies so lint and tests work
npm_config_production=false npm ci
