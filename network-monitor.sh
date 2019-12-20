#!/bin/bash

while true ; do
	if iwconfig 2>&1 | grep ESSID ; then
		sleep 60
	else
		echo "Network connection down! Attempting reconnection."
		ifup --force wlan0
		sleep 10
	fi
done
