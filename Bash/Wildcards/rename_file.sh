#!/bin/bash
#Change the name of files based on the provided extension

read -p "Please enter a file extension: " EXTENSION
read -p "Please enter a file prefix: (Press ENTER for $(date +"%Y%m%d")) " PREFIX

PREFIX="${PREFIX:-$(date +"%Y%m%d")}"

for FILE in *.$EXTENSION
do
    mv $FILE "${PREFIX}-${FILE}"
done

sleep 3