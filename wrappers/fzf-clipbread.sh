#!/usr/bin/env bash

# Apply clipbread transformations using fzf

SCRIPT="$(dirname "$(realpath "$0")")/base-script.sh"
SELECT=$($SCRIPT | fzf | awk '{print $1}')

for OPT in $SELECT; do "$SCRIPT" "$OPT"; done

# vim: fdm=manual tabstop=4 softtabstop=4 shiftwidth=4 expandtab:
