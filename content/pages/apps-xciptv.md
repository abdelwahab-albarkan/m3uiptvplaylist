---
path: /apps/xciptv
title: XCIPTV Player Setup & Login Guide for Android Devices
description: >-
  Install XCIPTV on Android phones, Android TV boxes and Fire TV, log in with
  Xtream Codes, and use its dual player engines to fix streams that won't play
  elsewhere.
h1: 'XCIPTV player: setup, login and the features that matter'
intro: >-
  XCIPTV is a free Android player built around Xtream Codes logins. Its standout
  trick is letting you switch the video engine when a stream refuses to play.
breadcrumb: XCIPTV
section: apps
primaryKeyword: xciptv
secondaryKeywords:
  - xc iptv
  - xciptv login
image: /img/android-tv-box.webp
imageAlt: Compact black Android TV box with its remote control
schema: howto
related:
  - /apps/iptv-smarters-pro
  - /setup/android-phone
  - /guides/iptv-box
  - /troubleshooting/iptv-not-working
updated: 2026-10-31T00:00:00.000Z
faqs:
  - q: Is XCIPTV the same as IPTV Smarters?
    a: >-
      No. They're different apps from different developers that do a similar
      job. Both support Xtream Codes logins. XCIPTV leans toward Android TV
      boxes and offers more playback engine options, while Smarters is available
      on more platforms.
  - q: Why does XCIPTV ask for a 'portal' or 'provider code'?
    a: >-
      Some providers distribute a custom-branded version of XCIPTV that's
      preconfigured for their server. The standard version uses a normal Xtream
      login with server URL, username and password.
  - q: Is XCIPTV available on iPhone?
    a: >-
      XCIPTV is focused on Android. On iPhone, iPad and Apple TV, use one of the
      players in our Apple setup guide.
---

## Install XCIPTV

### Essential recommendations for XCIPTV

- **Android phones, tablets and Android TV boxes:** search *XCIPTV* in Google Play. If your device's Play Store doesn't list it, download it from the developer's official site and follow the sideload steps in our [Android TV guide](/setup/android-tv).
- **Fire TV:** use the Downloader method from the [Fire TV guide](/setup/firestick) with the developer's official download address.

## Log in

1. Open XCIPTV. On the login screen, choose **Xtream Codes** (sometimes labeled *XC Login*).
2. Enter the **server URL** with `http://` and port, then your **username** and **password**.
3. Tap **Sign in**. XCIPTV downloads Live TV, Movies, Series and the guide in one go.

If you only have an M3U link, use the M3U option. Movies and series may appear as plain lists instead of posters.

## The dual player engine

XCIPTV can play video through two different engines:

- **ExoPlayer**, Google's media engine. It's efficient, works well with HLS streams, and is usually best on modern devices.
- **VLC engine**, which handles unusual formats and older MPEG-TS streams that sometimes fail elsewhere.

When a channel shows a black screen or an error, go to **Settings**, then **Player settings**, switch the engine, and try again. This one setting solves a large share of "this channel won't play" problems on Android boxes.

## Other useful features

- **EPG timeline view** with a quick-jump to the current time
- **Catch-up** for channels that support it, marked with an icon in the guide
- **Recording** to local storage on devices with enough space
- **Parental controls** with a PIN for selected categories
- **Speed test** built into settings, handy for checking whether buffering is your connection or the stream

## Recommended settings

- **Buffer:** if you see frequent short pauses, raise the buffer size in Player settings.
- **Stream format:** some versions let you choose between *TS* and *HLS*. If one stutters, try the other.
- **Auto-start:** on a dedicated TV box, enable *Launch on boot* so the TV comes up straight into live TV.

## When XCIPTV is the right choice

Choose XCIPTV if you're on an Android TV box or phone and want more control over playback than Smarters gives you, but don't need TiviMate's polished guide. If streams fail in every player, the issue is your connection or the service. Use our [troubleshooting checklist](/troubleshooting/iptv-not-working) to narrow it down.
