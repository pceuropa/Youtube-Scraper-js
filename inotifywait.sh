#!/bin/sh

while inotifywait -r -q -e modify .
  do
    clear
    nodejs $1
  done

# pyreverse -o png -p Pyreverse import-xml-sql/shema.py
# pyreverse -ASmy -k -o png pyreverse/main.py -p Main
# pylint
# mypy 
