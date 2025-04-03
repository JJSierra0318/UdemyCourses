#!/bin/bash
FILES=$@

for FILE in $FILES
do
    if [ -f $FILE ]
    then
        echo "It is a file."
        ls -l $FILE
    elif [ -d $FILE ]
    then
        echo "It is a directory."
        ls -l $FILE
    else
        echo "It is nethier a directory nor a file."
    fi
done

sleep 3