#!/bin/dash
# Change all .jpg files to be renamed YYYYMMDDname.jpg

for IMAGE in *.jpg
do
    mv $IMAGE $(date +"%Y%m%d")${IMAGE}
done