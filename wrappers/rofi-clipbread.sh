#!/usr/bin/env bash

# Use clipbread in rofi dmenu mode

PROMPT="🍞 clipbread"
SCRIPT="$(dirname "$(realpath "$0")")/base-script.sh"

rofi -sort -sorting-method "fzf" -modes "$PROMPT:$SCRIPT" -show "$PROMPT"

# vim: fdm=manual tabstop=4 softtabstop=4 shiftwidth=4 expandtab:
