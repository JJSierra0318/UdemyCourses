#!/bin/bash
# Start sleepwalking

case $1 in
    start)
        echo "Start Sleepwalking"
        ;;
    stop)
        echo "Stop Sleepwalking"
        ;;
    *)
        echo "Usage sleepwalking start|stop"
        exit 1
        ;;
esac

sleep 3