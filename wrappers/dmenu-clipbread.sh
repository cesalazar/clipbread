#!/usr/bin/env bash

# Apply clipbread transformations using dmenu

SCRIPT="$(dirname "$(realpath "$0")")/base-script.sh"
PROMPT="🍞 clipbread"
SELECT="$($SCRIPT -l | dmenu -p "$PROMPT")"

$SCRIPT "$SELECT"

# vim: fdm=manual tabstop=4 softtabstop=4 shiftwidth=4 expandtab:
