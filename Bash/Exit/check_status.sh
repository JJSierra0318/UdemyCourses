#!/bin/bash
cat "/etc/shadow"

if [ $? -eq "0" ]
then
    echo "Command Succeded"
    sleep 2
    exit 0
fi

echo "Command failed"
sleep 2
exit 1