# Playlist Autoplay

An [IINA](https://iina.io/ "The modern media player for macOS") plugin to toggle "Play Next Item Automatically" and "Playlist Loop" either together via "Autoplay and Playlist Loop" or individually via the Plugin menu.

<p align="center"><img width="70%" alt="plugin menu" src="unknown" /></p>

## Install

Open `PlaylistAutoplay.iinaplgz` in IINA and accept installation. If plugins are disabled, enable the plugin system in IINA's Settings > Plugins and restart IINA.

Open a video, then use **Plugin > Playlist Autoplay**:

- **Autoplay and Playlist Loop**: toggle "Play Next Item Automatically" and "Playlist Loop" together.
- **Play Next Item Automatically**: toggle only this setting.
- **Playlist Loop**: toggle only this setting.

Changes apply to the current player window. The combined choice is saved and applied when a new player first loads a file. Individual changes last for that player; the plugin doesn't continually enforce the combined choice or reapply it on every track.

## IINA integration

Autoplay uses mpv's `keep-open` option, the same playback control used by IINA's built-in "Play next item automatically" setting. IINA's plugin API doesn't expose the app's preferences, so the built-in checkbox isn't changed.

Playlist looping uses `loop-playlist=inf` and updates IINA's native loop indicator. Enabling it also disables single-file looping, matching IINA's own playlist-loop action. Turning autoplay back on restores the player's previous `keep-open=yes/no` value when available.

No network or file-system permissions are requested.

## Rebuild the installable package

```sh
cd PlaylistAutoplay.iinaplugin
/usr/bin/zip -X ../PlaylistAutoplay.iinaplgz Info.json main.js
```