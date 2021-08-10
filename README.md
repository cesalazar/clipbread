# Clipbread

MVP of a node "app" to modify the content of the clipboard. It will allow the
user to define their own functions and aliases.

It can be run directly from the shell:

```bash
node . trim double singleQuote
```

or through [fzf][1] or [dmenu][2]:

```bash
# This will be eventually included in a bash script or something
awk '/functions\s?=\s?{/,/^}/' index.js | grep -Ev '(functions\s?=|^})' \
    | grep . | grep -Ev '^\s+?(\.|\/)' | tr -d ':' | awk '{print $1}' | fzf \
    | xargs node .
```

[1]: https://github.com/junegunn/fzf
[2]: https://tools.suckless.org/dmenu/
