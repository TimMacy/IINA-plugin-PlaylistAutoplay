# Playlist Autoplay
<img align="right" width="30%" alt="plugin menu" src="https://github.com/user-attachments/assets/f173cca0-3b5c-4831-ac35-09311b52bfda" />

An [IINA](https://iina.io/ "The modern media player for macOS") plugin to also toggle "Play Next Item Automatically" and "Playlist Loop" together via "Autoplay and Playlist Loop" in the Plugin menu.

<br clear="right" />

## Install

Open `PlaylistAutoplay.iinaplgz` in IINA and accept installation. If plugins are disabled, enable the plugin system in IINA's Settings > Plugins and restart IINA.

Open a video, then use **Plugin > Playlist Autoplay**:

- **Autoplay and Playlist Loop**: toggle "Play Next Item Automatically" and "Playlist Loop" together.
- **Play Next Item Automatically**: toggle only this setting.
- **Playlist Loop**: an entry of the same setting that can be found under Playback.

Changes apply to the current player window. The combined choice is saved and applied when a new player first loads a file. Individual changes last for that player; the plugin doesn't continually enforce the combined choice or reapply it on every track.

## IINA integration

Autoplay uses mpv's `keep-open` option, the same playback control used by IINA's built-in "Play next item automatically" setting. IINA's plugin API doesn't expose the app's preferences, so the built-in checkbox isn't changed.

No network or file-system permissions are requested.

## Rebuild the installable package

```sh
cd PlaylistAutoplay.iinaplugin
/usr/bin/zip -X ../PlaylistAutoplay.iinaplgz Info.json main.js
```

## License

Licensed under the [MIT License](https://github.com/TimMacy/IINA-plugin/blob/main/LICENSE).
