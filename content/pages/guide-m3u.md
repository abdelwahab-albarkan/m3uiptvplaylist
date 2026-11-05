---
path: /guides/m3u-playlist
title: 'M3U Playlist vs Xtream Codes: How IPTV Logins Work'
description: >-
  What an M3U playlist is, how M3U and M3U8 differ, how Xtream Codes logins
  work, which one to use in your player, and how to keep your playlist link
  private.
h1: 'M3U playlists and Xtream Codes, explained'
intro: >-
  Every IPTV subscription arrives as one of two things: an M3U link or an Xtream
  Codes login. Knowing the difference saves a lot of frustration when you set up
  a player.
breadcrumb: M3U & Xtream Codes
section: guides
primaryKeyword: m3u playlist
secondaryKeywords:
  - iptv m3u
  - m3u vs m3u8
  - code xtream
  - m3u playlist format
image: /img/m3u-playlist.webp
imageAlt: >-
  Illustration of a stacked playlist with play buttons glowing on a dark
  background
schema: article
related:
  - /guides/iptv-epg
  - /apps/tivimate
  - /apps/kodi
  - /setup/windows-mac
  - /troubleshooting/iptv-not-working
updated: 2026-10-31T00:00:00.000Z
faqs:
  - q: Can I convert an Xtream Codes login into an M3U link?
    a: >-
      Usually, yes. Many providers can give you both formats for the same
      account. Some players also generate the M3U link from your Xtream details.
      Ask your provider for the exact format they support.
  - q: Are free M3U playlists safe to use?
    a: >-
      Generally no. Free playlists posted online are typically collections of
      unlicensed or stolen streams. They break constantly, and some links log
      your IP address or point to malicious pages. Use only playlists from a
      service you've subscribed to.
  - q: How do I convert an M3U8 stream to MP4?
    a: >-
      For video you're allowed to save, such as your own recordings, the free
      tool FFmpeg can copy an HLS stream into an MP4 file without re-encoding.
      Downloading copyrighted streams you don't have rights to is a different
      matter and isn't something we help with.
---

## What an M3U playlist is
### Essential recommendations for M3U Playlist


An M3U file is a plain-text list of media addresses. For IPTV, each channel gets two lines: a description line and the stream address.

```
#EXTM3U
#EXTINF:-1 tvg-id="example.us" tvg-logo="https://.../logo.png" group-title="News",Example News HD
http://server.example:8080/live/username/password/12345.ts
```

- **#EXTM3U** marks the start of the playlist.
- **#EXTINF** holds the channel name and optional tags: `tvg-id` links the channel to the TV guide, `tvg-logo` points to the logo, and `group-title` sets the category.
- The next line is the **stream URL** your player opens.

Your provider usually gives you an M3U **link** (a URL), not a file. The player downloads the list from that link each time it refreshes, so channel changes on the provider's side show up automatically.

## M3U vs M3U8

The format is the same. **M3U8** simply means the file is UTF-8 encoded, so it handles accented characters and other alphabets. M3U8 is also the playlist format used by **HLS** (HTTP Live Streaming), where a single video is split into small chunks listed in an .m3u8 file. In IPTV, you'll see both terms used for channel playlists.

## What Xtream Codes is

Xtream Codes started as server software, and its login format became an industry standard. Instead of one long link, you get three things:

- **Server URL:** for example `http://server.example:8080`
- **Username**
- **Password**

The player uses them to ask the server for live channels, movies, series and the guide separately. That's why Xtream logins usually show posters, descriptions and seasons neatly, while M3U logins often dump everything into one long list.

## Which should you use?

| | M3U link | Xtream Codes |
| --- | --- | --- |
| Typing on a TV remote | Painful (long URL) | Easier (three short fields) |
| Movies and series layout | Basic | Organized, with posters |
| TV guide | Usually needs a separate EPG link | Usually loads automatically |
| Supported players | Almost all, including VLC and Kodi | Most IPTV players, not VLC |

**Use Xtream Codes when your player supports it.** Use M3U for VLC, Kodi's Simple Client, or players that only accept a link.

## Converting M3U8 video

If you have an M3U8 video you're allowed to save and need an MP4 file, follow our [M3U8 to MP4 guide](/guides/m3u8-to-mp4).

## Keep your login private

Your M3U link and Xtream details work like a password. Anyone who has them can use your connections.

- Don't post screenshots that show the link or password.
- Only enter them in official apps and the real activation sites of MAC-based players.
- If you suspect someone else is using your account (you see *max connections* errors), ask your provider to reset your password.

## Common playlist problems

- **"Unable to parse playlist":** the link returned an error page instead of a playlist. Check for typos and copy it again.
- **Channels load but the guide is empty:** the `tvg-id` values don't match your guide source. See [our EPG guide](/guides/iptv-epg).
- **Movies missing:** switch to the Xtream Codes login if your provider offers it.


When choosing a reliable **M3U Playlist**, verifying network peering and server routing ensures optimal playback stability.

Our technical team continuously tests each **M3U Playlist** configuration across multiple hardware devices to eliminate buffering.

Subscribers seeking maximum value from their **M3U Playlist** can take advantage of our 24/7 technical support desk on WhatsApp.

To get the most out of your **M3U Playlist**, we recommend maintaining a steady 25 to 50 Mbps internet connection with low packet jitter.

Every **M3U Playlist** account is backed by our customer satisfaction commitment and complete step-by-step setup walkthroughs.
