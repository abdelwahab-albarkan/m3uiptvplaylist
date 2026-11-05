---
path: /guides/iptv-epg
title: 'IPTV EPG Explained: Fix an Empty or Wrong TV Guide'
description: >-
  How the IPTV TV guide (EPG) works, how to add an XMLTV link, and how to fix an
  empty guide, wrong times and channel matching problems.
h1: 'IPTV EPG: how the TV guide works and how to fix it'
intro: >-
  The EPG (Electronic Program Guide) is what turns a list of streams into a
  cable-style grid showing what's on now and next. When it's missing or wrong,
  these fixes usually sort it out.
breadcrumb: TV guide (EPG)
section: guides
primaryKeyword: iptv epg
secondaryKeywords:
  - epg iptv
  - epg for iptv
  - free iptv epg
  - best epg for iptv
image: /img/epg-tv-guide.webp
imageAlt: Illustration of a TV guide grid with rows of channels and program blocks
schema: article
related:
  - /guides/m3u-playlist
  - /apps/tivimate
  - /apps/kodi
  - /troubleshooting/iptv-not-working
  - /setup/lg-tv
updated: 2026-10-31T00:00:00.000Z
faqs:
  - q: Why does my guide show the right shows but at the wrong times?
    a: >-
      The guide data is in a different time zone from your device, or your
      device's time zone is set wrong. Check the device's date and time settings
      first, then use the player's EPG time-shift option to move the guide by
      whole hours.
  - q: Can I use a free EPG source?
    a: >-
      Free XMLTV sources exist, but they often cover limited channels and need
      careful ID matching. If your provider supplies a guide that matches its
      channel IDs, that's almost always the easiest and most accurate option.
  - q: How often should the guide update?
    a: >-
      Once a day is typical. Set your player to update the EPG on startup or
      every 24 hours, and keep 'days to load' modest, around 3 to 7 days, so
      updates are fast on low-memory devices.
---

## IPTV EPG: How the EPG works

The guide is separate from the video streams. It's a data file, usually in **XMLTV** format, that lists programs by channel with start and end times. Your player downloads it and matches each program list to a channel in your playlist.

The match happens through a **channel ID**:

- In your playlist, each channel has a `tvg-id`, for example `examplenews.us`.
- In the XMLTV file, each channel has the same ID.
- When the two match, the player shows the right programs on the right row.

With an **Xtream Codes** login, most players fetch the provider's guide automatically. With an **M3U** link, you may need to add the guide URL yourself. Read more in [M3U vs Xtream Codes](/guides/m3u-playlist).

## Adding an EPG source

The menu names vary slightly by player:

- **TiviMate:** Settings, then EPG, then Add EPG source, then paste the URL.
- **IPTV Smarters Pro:** usually automatic with Xtream; use Settings, then EPG, then Refresh EPG.
- **Kodi (PVR IPTV Simple Client):** Configure, then EPG, then XMLTV URL. See our [Kodi guide](/apps/kodi).
- **IBO Player and similar:** add the EPG URL alongside your playlist on the developer's website.

Large guide files can take a few minutes to load the first time, especially on a Fire TV Stick.

## Fixing common guide problems

### IPTV EPG: "No information" on every channel

- The guide hasn't downloaded yet. Trigger a manual update and wait.
- The EPG URL is wrong or expired. Open it in a browser; it should download or show XML, not an error page.
- The device ran out of memory loading a huge file. Reduce *days to load* in the player settings.

### Some channels have a guide, others don't

The `tvg-id` for those channels doesn't match the guide file. In TiviMate you can fix this channel by channel: long-press the channel, choose **Edit**, then **EPG**, and pick the right listing. Otherwise, ask your provider to correct the IDs.

### Programs are shifted by an hour or more

1. Check the device's **time zone** and make sure automatic time is on.
2. If the device is correct, use the player's **EPG time shift** to move the guide by whole hours until the listings line up with what's actually playing.
3. After a daylight saving change, a stale guide may be off by one hour until it refreshes.

### Guide works but logos are missing

Logos come from the `tvg-logo` tag in the playlist, not from the EPG. Refresh the playlist, or turn on *use logos from EPG* if your player offers it.

## Getting the most out of the guide

- **Hide channel groups** you never watch so the grid is shorter and faster.
- **Use catch-up** where offered. Channels with catch-up let you start past programs straight from the guide.
- **Set reminders** for games and shows, a feature in TiviMate and several other players.


When choosing a reliable **IPTV EPG**, verifying network peering and server routing ensures optimal playback stability.

Our technical team continuously tests each **IPTV EPG** configuration across multiple hardware devices to eliminate buffering.

Subscribers seeking maximum value from their **IPTV EPG** can take advantage of our 24/7 technical support desk on WhatsApp.

To get the most out of your **IPTV EPG**, we recommend maintaining a steady 25 to 50 Mbps internet connection with low packet jitter.

Every **IPTV EPG** account is backed by our customer satisfaction commitment and complete step-by-step setup walkthroughs.

Configuring your media player buffer cache properly prevents stream drops and enhances your **IPTV EPG** viewing experience.

For seamless multi-room entertainment, select a **IPTV EPG** plan that supports simultaneous streams across your family devices.
