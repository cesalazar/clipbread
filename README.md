# Clipbread

Clipbread is a [Node.js][node] app that allows transforming the content of the
clipboard using user-defined JavaScript functions or, optionally, their aliases.

It can be used directly in the terminal:

```bash
# Using the name of the functions...
clipbread trim toUpperCase singleQuote

# ...or their (user-defined) aliases
clipbread t tuc sq
```

or wrapped in an external tool like [fzf][fzf], [rofi][rofi], [dmenu][dmenu],
[Alfred][alfred] (with PowerPack), etc. See [wrappers][wrappers] for reference.

Clipbread comes with few examples in its config file, but it's intended to be
customized by you, the user. Execute `clipbread -i` to copy the config files to
your `$HOME` and get started, but feel free to check [my config](myconfig) for
inspiration.

## FAQ

**Q: My custom function is not being executed in the wrapper**\
A: Run clipbread in a terminal in case node is throwing an error, then check how
to debug in the docs of the wrapper you're using.

**Q: Does this work with [bun][bun] or [deno][deno]?**\
A: Yes, but you'll have to make changes in the scripts. I did a very basic check
for the lulz, but I don't use those regularly.

**Q: I don't know how to program, can I still use this?**\
A: Sure, ask ChatGPT or any other AI to write a function to do what you need to
achieve, and paste it in your config file.

**Q: Why didn't you write this in/on TypeScript, Rust, Cobol, a napkin?**\
A: Yes.

**Q: Seriously, JavaScript sucks.**\
A: I know.

[alfred]: https://www.alfredapp.com/
[bun]: https://bun.sh/
[deno]: https://deno.com/
[dmenu]: https://tools.suckless.org/dmenu/
[fzf]: https://github.com/junegunn/fzf
[myconfig]: https://gist.github.com/cesalazar/d64cffc85c635b4384307bc76b175fd8
[node]: https://nodejs.org/en
[wrappers]: ./wrappers/README.md
