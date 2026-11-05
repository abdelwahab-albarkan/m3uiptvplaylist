---
path: /guides/m3u8-to-mp4
title: 'M3U8 to MP4: How to Convert a Video With FFmpeg or VLC'
description: >-
  Convert an M3U8 stream to an MP4 file using FFmpeg or VLC: exact commands,
  common errors, and when conversion won't work, including DRM and copyright
  limits.
h1: How to convert M3U8 to MP4
intro: >-
  An M3U8 file isn't really a video. It's a playlist pointing to many small
  video chunks. Converting it means downloading those chunks and joining them
  into one MP4, and free tools can do that in a single step.
breadcrumb: M3U8 to MP4
section: guides
primaryKeyword: m3u8 to mp4
secondaryKeywords:
  - m3u8-downloader
  - m3u8 player online
  - m3u8 play online
image: /img/home-network.webp
imageAlt: 'Illustration of a home router connected to a phone, tablet, laptop and TV'
schema: howto
related:
  - /guides/m3u-playlist
  - /setup/windows-mac
  - /guides/is-iptv-legal-usa
  - /apps/kodi
updated: 2026-11-02T00:00:00.000Z
faqs:
  - q: Is it legal to convert an M3U8 stream to MP4?
    a: >-
      It depends on the video and your rights to it, not on the file format.
      Converting your own recordings or footage you have permission to save is
      generally fine. Saving copyrighted streams without permission can break
      the law or a service's terms.
  - q: Why does my MP4 have no sound?
    a: >-
      The source may use separate audio tracks or an audio format the MP4 can't
      hold with a straight copy. Try re-encoding the audio with -c:v copy -c:a
      aac in FFmpeg, and check that the master playlist includes an audio track.
  - q: Can I just rename a .m3u8 file to .mp4?
    a: >-
      No. The .m3u8 file is only a text list of addresses and contains no video.
      Renaming it produces a broken file, because the video chunks still have to
      be downloaded and joined.
---

> Only convert video you own or have permission to save. Streaming services and copyright holders often prohibit downloads, and these steps don't remove DRM protection.

## M3U8 to MP4: What's inside an M3U8 file

### Essential recommendations for M3U8 to MP4

M3U8 is the playlist format used by HLS (HTTP Live Streaming). If you open one in a text editor, you'll see a list of short video segments, usually a few seconds each, or links to other playlists at different quality levels. Your player downloads the segments in order, which is how it can switch quality while you watch. For more on playlist formats, see our [M3U guide](/guides/m3u-playlist).

Because the playlist holds no video itself, a converter has to read it, fetch every segment and combine them into a single file.

## Method 1: FFmpeg (best quality and fastest)

FFmpeg is a free, open-source command-line tool. Download it from **ffmpeg.org**, open a terminal, and run:

```
ffmpeg -i "https://example.com/video/playlist.m3u8" -c copy output.mp4
```

Here's what that does:

- `-i` sets the input, which can be a URL or a local .m3u8 file.
- `-c copy` copies the video and audio without re-encoding, so there's no quality loss and the job is quick.
- `output.mp4` is the name of the file you're creating.

If FFmpeg reports an audio bitstream error, use this version, which fixes a common AAC packaging problem:

```
ffmpeg -i "https://example.com/video/playlist.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```

If a straight copy still won't play properly, re-encode it. This takes longer and uses more processing power:

```
ffmpeg -i "https://example.com/video/playlist.m3u8" -c:v libx264 -c:a aac output.mp4
```

## Method 2: VLC (no command line)

1. Open VLC and choose **Media**, then **Convert / Save**.
2. Open the **Network** tab, paste the M3U8 address, and click **Convert / Save**.
3. Choose the **Video - H.264 + MP3 (MP4)** profile.
4. Pick a destination file ending in `.mp4`, then click **Start**.

VLC re-encodes as it goes, so it can be slower than an FFmpeg copy, and a progress bar may not appear. Let the job finish before you open the file.

## Common errors and fixes

| Error | Likely cause | Fix |
| --- | --- | --- |
| 403 Forbidden | The link expired or requires login headers | Get a fresh link you're authorized to use |
| 404 Not Found | The playlist or a segment has moved | Check the URL, including any query string |
| Invalid data found | The link returned a web page, not a playlist | Open it in a browser or text editor to check |
| File stops early | A live stream, or a network drop during the download | Check the source, then run it again |
| Encrypted segments fail | The stream uses DRM or protected keys | It can't be converted with these steps |

## Live streams behave differently

A video-on-demand playlist has an end, so FFmpeg stops by itself. A live playlist keeps growing, so FFmpeg keeps recording until you press **Q** to stop it. Press it only once, so the tool can finish writing the file properly. Otherwise, the MP4 may not open.

## Just want to play it?

You don't need to convert anything to watch an M3U8 link. [VLC and other desktop players](/setup/windows-mac) can open one directly using **Open Network Stream**. Be careful with online M3U8 players and download sites, though. Pasting a private link into a third-party site shares that link with whoever runs it.


When choosing a reliable **M3U8 to MP4**, verifying network peering and server routing ensures optimal playback stability.

Our technical team continuously tests each **M3U8 to MP4** configuration across multiple hardware devices to eliminate buffering.

Subscribers seeking maximum value from their **M3U8 to MP4** can take advantage of our 24/7 technical support desk on WhatsApp.

To get the most out of your **M3U8 to MP4**, we recommend maintaining a steady 25 to 50 Mbps internet connection with low packet jitter.
