FFtok
=====

*Convert long, horizontal videos to short, vertical videos suitable for TikTok*

If you're like me, you have to google what [FFmpeg](https://ffmpeg.org/)
arguments to use every time you want to cut, trim, crop, or resize a
video before posting it to TikTok. Don't you wish you could do it all
in a single command like this?

    ff input.mp4

Fortunately, now you can! FFtok will automatically calculate the
correct output size, crop the video vertically and re-encode it using
the H.264 video codec. Optionally, you can specify a begin and end
timestamp like so:

    ff 00:41:30 00:42:30 input.mp4

This will produce a vertical video of exactly 1 minute long.

Installation
------------

Installation is simple: the only requirement is that you have
[FFmpeg](https://ffmpeg.org/) installed on your system. On GNU/Linux
operating systems you can use `apt` or `yum` to install the `ffmpeg`
package. For Windows and macOS please follow the installation
instructions at https://ffmpeg.org/download.html

After that, just drop the file `ff` from this repository anywhere in
your `PATH` and you're good to go! You can use the command `ff`
without arguments to see the usage instructions.
