#!/bin/bash
FILE=$1

if [ -f $FILE ]
then
    exit 0
elif [ -d $FILE ]
then
    exit 1
else
    exit 2
fi