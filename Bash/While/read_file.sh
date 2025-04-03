#!/bin/bash
# Read lines and prepend number

LINE_NUMBER=1
while read LINE
do
    echo "${LINE_NUMBER}: ${LINE}"
    ((LINE_NUMBER++))
done < ../scripting/variables.sh

sleep 3