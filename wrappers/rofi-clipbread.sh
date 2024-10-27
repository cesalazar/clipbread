#!/usr/bin/env bash

# Apply clipbread transformations using rofi in dmenu mode

SCRIPT="$(dirname "$(realpath "$0")")/base-script.sh"
PROMPT="🍞 clipbread"

rofi -sort -sorting-method "fzf" -modes "$PROMPT:$SCRIPT" -show "$PROMPT"

# vim: fdm=manual tabstop=4 softtabstop=4 shiftwidth=4 expandtab:
