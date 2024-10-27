#!/usr/bin/env bash

# /!\ Keep this file in the same directory as other wrappers /!\

# Debug options, shown only in the terminal
# set -euxo pipefail

# You could try `bun` if you're feeling lucky, punk!
INTERPRETER=node

# This dance gets the `main` JS file automatically...
THIS_FILE_DIR=$(dirname "$(realpath "$0")")
CLIPBREAD_SCRIPT_DIR=${THIS_FILE_DIR%/*}
CLIPBREAD_SCRIPT_FILE_NAME=index.js
CLIPBREAD_SCRIPT="$CLIPBREAD_SCRIPT_DIR/$CLIPBREAD_SCRIPT_FILE_NAME"

# ...but you can set the absolute path if you prefer:
# CLIPBREAD_SCRIPT=/absolute/path/to/clipbread/index.js

# Command that will execute the `main` script
CMD=( "$INTERPRETER" "$CLIPBREAD_SCRIPT" )

# Check if the interpreter exists
if [ ! "$(command -v $INTERPRETER)" ]; then
    printf "%s\n" "Command not found: $INTERPRETER"
    exit 1
fi

# Check if the script file exists
if [ ! -f "$CLIPBREAD_SCRIPT" ]; then
    printf "%s\n" "File not found: $CLIPBREAD_SCRIPT"
    exit 1
fi

# If arguments are provided, run the script with the first one
if [ $# -gt 0 ] && [ -f "$CLIPBREAD_SCRIPT" ]; then
    "${CMD[@]}" "$(echo "$@" | awk '{print $1}')"
fi

# Run the script with the -l option if there are no arguments
if [ -f "$CLIPBREAD_SCRIPT" ]; then
    "${CMD[@]}" -l
fi

# vim: fdm=manual tabstop=4 softtabstop=4 shiftwidth=4 expandtab:
