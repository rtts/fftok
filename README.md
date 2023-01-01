FFtok
=====

*Convert long, horizontal videos to short, vertical videos suitable
for TikTok*

If you're like me and you have to google what
[FFmpeg](https://ffmpeg.org/) arguments to use every time you want to
cut, trim, crop, concatenate, or resize a video before posting it to
TikTok, then this repository contains 3 utilities to make life easier.

They are:

1. `ts` - Cut video into intermediary ts files
2. `cc` - Concatenate ts files
3. `ff` - Convert to video suitable for TikTok

Here is an example of how to use them:

```shell
$ ts 'Jurassic Park.mp4' 00:30:42 00:31:15
$ cc 'Jurassic Park.ts' 'Family Guy.ts' combined.ts
$ ff combined.ts out.mp4
```


Installation
------------

First, install [FFmpeg](https://ffmpeg.org/) on your system. On
GNU/Linux operating systems you can use your package manager to
install the `ffmpeg` package. For Windows and macOS follow the
installation instructions at https://ffmpeg.org/download.html

After that, drop the files from this repository anywhere in your
`PATH` and you're good to go!


Usage
-----

Execute the commands `ts`, `cc`, or `ff` without arguments to see the
usage instructions.
