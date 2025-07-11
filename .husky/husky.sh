#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "true" ] && echo "husky: $*"
  }
  readonly hookName="$(basename "$0")"
  debug "starting $hookName..."
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY=0 skip husky"
    exit 0
  fi
  if [ -f ~/.huskyrc ]; then
    debug "~/.huskyrc found, sourcing..."
    . ~/.huskyrc
  fi
  export readonly husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"
  debug "$hookName finished with $exitCode exit code"
  exit "$exitCode"
fi
