#!/bin/bash
function file_count() {
    local DIRECTORY=$1
    # | passes the output form the left to the right
    ls $DIRECTORY | wc -l
}

file_count /etc
file_count /var
file_count /usr/bin

sleep 3