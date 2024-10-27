# clipbread

clipbread is a [Node.js][node] app that allows transforming the content of the
clipboard using user-defined JavaScript functions or, optionally, their aliases.

It can be used directly in the terminal:

```bash
# Using the name of the functions...
clipbread trim toUpperCase singleQuote

# ...or their (user-defined) aliases
clipbread t tuc sq
```

It can also be piped to an external tool like [fzf][fzf], [rofi][rofi],
[dmenu][dmenu], [Alfred][alfred] (with PowerPack), etc. for convenience and
speed. See [wrappers][wrappers] for reference.

clipbread comes with few examples in its config file, but it's intended to be
customized by you, the user. Start by executing `clipbread -i` to copy the
config files to your `$HOME`.

Feel free to check [my config](myconfig) for inspiration.

## FAQ

<details>
  <summary>
    <b>My custom function is not being executed in the wrapper, what do?</b>
  </summary>

  Run clipbread in a terminal in case it's throwing an error, then check how to
  debug in the docs of the wrapper you're using/piping to.
</details>

<details>
  <summary>
    <b>Does this work with [bun][bun] or [deno][deno]?</b>
  </summary>
  Yes, but you'll have to make changes in the scripts. I did a very basic check
  for the lulz, but I don't use those regularly.
</details>

<details>
  <summary>
    <b>I don't know how to program, can I still use this?</b>
  </summary>
  Sure, ask ChatGPT or any other AI to write a function to do what you want to
  achieve, and paste it in your config file.
</details>

<details>
  <summary>
    <b>Why didn't you write this on TypeScript, Rust, Cobol, a napkin?</b>
  </summary>
  Yes.
</details>

<details>
  <summary>
    <b>Seriously, JavaScript sucks.</b>
  </summary>
  I know. This is not a question.
</details>

[alfred]: https://www.alfredapp.com/
[bun]: https://bun.sh/
[deno]: https://deno.com/
[dmenu]: https://tools.suckless.org/dmenu/
[fzf]: https://github.com/junegunn/fzf
[myconfig]: https://gist.github.com/cesalazar/d64cffc85c635b4384307bc76b175fd8
[node]: https://nodejs.org/en
[rofi]: https://github.com/davatorium/rofi
[wrappers]: ./wrappers/README.md
