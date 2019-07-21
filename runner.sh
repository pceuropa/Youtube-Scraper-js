#!/bin/sh
# apt install inotify-tools

while inotifywait -r -q -e modify .
  do
    clear
    nodejs $1
  done
