---
path: /apps/kodi
title: 'Kodi IPTV Addon: Complete 2026 Setup & Streaming Guide'
description: >-
  Watch IPTV in Kodi with the official PVR IPTV Simple Client: add your M3U and
  EPG links, fix guide timing, and tune Kodi for live TV.
h1: 'Kodi IPTV Addon: Complete guide and walkthrough'
intro: >-
  Kodi doesn't need third-party add-ons for IPTV. Its official PVR IPTV Simple
  Client turns your playlist into a full live TV section with a guide, channel
  groups and favorites.
breadcrumb: Kodi
section: apps
primaryKeyword: kodi iptv addon
secondaryKeywords:
  - iptv add on kodi
  - best iptv addon for kodi
  - kodi pvr iptv simple client
image: /img/smart-tv-home.webp
imageAlt: Modern living room with a wall-mounted TV ready for a media center setup
schema: howto
related:
  - /setup/windows-mac
  - /guides/iptv-epg
  - /guides/m3u-playlist
  - /setup/android-tv
updated: 2026-10-31T00:00:00.000Z
faqs:
  - q: Is PVR IPTV Simple Client safe?
    a: >-
      Yes. It's an official add-on maintained in Kodi's own repository and
      installed from inside Kodi. That's very different from unofficial 'builds'
      and third-party add-ons, which often scrape unlicensed streams and can
      contain malicious code.
  - q: Does Kodi support Xtream Codes logins?
    a: >-
      PVR IPTV Simple Client uses M3U links. Most providers can give you an M3U
      link that corresponds to your Xtream login. Ask support for the M3U format
      if you only have Xtream details.
  - q: Why are guide times off by a few hours?
    a: >-
      The guide data may be in a different time zone from your device. In the
      add-on's EPG settings, adjust the EPG time shift in hours until program
      times line up.
---

## Kodi IPTV Addon: Before you start
### Essential recommendations for Kodi IPTV Addon


- Install Kodi from **kodi.tv** or your device's official app store (Google Play, Microsoft Store, Amazon Appstore).
- Have your **M3U link** ready, and an **EPG (XMLTV) link** if your provider gave you one separately.
- This guide uses Kodi's default *Estuary* skin. Menu names may differ slightly in other skins.

## Install PVR IPTV Simple Client

1. From the Kodi home screen, go to **Add-ons**.
2. Choose **Install from repository**, then **Kodi Add-on repository**, then **PVR clients**.
3. Select **PVR IPTV Simple Client** and click **Install**.

On some Linux systems the add-on comes as a separate package from your distribution. Install it there if it doesn't appear in the list.

## Add your playlist

1. Open **Add-ons**, then **My add-ons**, then **PVR clients**, then **PVR IPTV Simple Client**, then **Configure**.
2. Under **General**, set **Location** to *Remote path (Internet address)*.
3. Paste your link into **M3U play list URL**.
4. Keep **Cache M3U at local storage** on. It makes Kodi start faster.

## Add the TV guide

1. In the same configuration window, open the **EPG** tab.
2. Set **Location** to *Remote path* and paste your **XMLTV URL**.
3. If guide times are wrong, set **EPG time shift** by whole hours.
4. Click **OK**, then **Enable** the add-on if it isn't already.

Restart Kodi. A new **TV** entry appears on the home screen with **Channels** and **Guide**.

## Make Kodi feel like a TV box

- **Start in TV:** Settings, then Interface, then Skin, then Configure skin, and set the startup window to *TV channels*.
- **Smooth sports:** Settings, then Player, then Videos, then *Adjust display refresh rate*: **On start/stop**.
- **Channel groups:** in **TV**, then **Channels**, open the side menu and use **Group manager** to build a short "Favorites" group.
- **Hardware decoding:** keep **Allow hardware acceleration** on in Player settings. On an Nvidia Shield, it's what keeps 4K playback smooth.

## About "best Kodi IPTV add-ons" lists

Many websites rank third-party Kodi add-ons that come with streams built in. Those add-ons usually pull unlicensed content from random sources, break often, and are a known malware risk, which is why Kodi's own team doesn't support them. If you have a legitimate IPTV subscription, the official Simple Client is all you need.

## If something isn't working

- **"No channels" or add-on disabled:** re-check the M3U URL for typos, then go to Settings, then PVR & Live TV, then General, then *Clear data*, and restart.
- **Streams fail but VLC plays them:** in the add-on, try turning on *Use inputstream.ffmpegdirect* for that playlist, which handles some stream types better.
- **Buffering:** see our [buffering fixes](/troubleshooting/iptv-buffering). Kodi's cache can also be raised through an advanced settings file.


When choosing a reliable **Kodi IPTV Addon**, verifying network peering and server routing ensures optimal playback stability.

Our technical team continuously tests each **Kodi IPTV Addon** configuration across multiple hardware devices to eliminate buffering.

Subscribers seeking maximum value from their **Kodi IPTV Addon** can take advantage of our 24/7 technical support desk on WhatsApp.
