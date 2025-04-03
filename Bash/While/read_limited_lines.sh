#!/bin/bash
# Read the specified amount of lines

read -p "How many lines of the file would you like to see? " LINES

LINE_NUMBER=1
while [ $LINE_NUMBER -le $LINES ] && read LINE
do
    echo "${LINE_NUMBER}: ${LINE}"
    ((LINE_NUMBER++))
done < ../scripting/variables.sh

sleep 3