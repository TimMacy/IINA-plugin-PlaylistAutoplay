# Playlist Together

An IINA 1.5 plugin with one combined toggle and two individual controls.

## Install

Open `PlaylistTogether.iinaplgz` in IINA and accept installation. If plugins are disabled, enable the plugin system in IINA's Settings > Plugins and restart IINA.

Open a video, then use **Plugin > Playlist Together**:

- **Autoplay and Playlist Loop**: checking it enables both; unchecking it disables both.
- **Play Next Item Automatically**: change automatic advancement independently.
- **Playlist Loop**: change playlist looping independently.

The combined checkmark records your last combined choice. Individual changes leave it alone, so switching it off always turns both off, and switching it on always turns both on.

Changes apply to the current player window. The combined choice is saved and applied when a new player first loads a file. Individual changes last for that player; the plugin doesn't continually enforce the combined choice or reapply it on every track.

The combined choice defaults to off. Keep the plugin itself enabled and use its menu toggle to switch both options off; disabling or uninstalling a plugin stops its code and doesn't run a reset action.

## IINA integration

Autoplay uses mpv's `keep-open` option, the same playback control used by IINA's built-in "Play next item automatically" setting. IINA's plugin API doesn't expose the app's preferences, so the built-in checkbox isn't changed. Use the plugin's individual autoplay menu item to see and change the current playback behavior.

Playlist looping uses `loop-playlist=inf` and updates IINA's native loop indicator. Enabling it also disables single-file looping, matching IINA's own playlist-loop action. Turning autoplay back on restores the player's previous `keep-open=yes/no` value when available; if autoplay was already off when the player started, it uses `yes` (keep the window open at the end).

No network or file-system permissions are requested.

References: [IINA playback-option mapping](https://github.com/iina/iina/blob/v1.5.0/iina/MPVController.swift), [IINA loop controls](https://github.com/iina/iina/blob/v1.5.0/iina/PlayerCore.swift), and [plugin menu API](https://docs.iina.io/interfaces/IINA.API.Menu.html).

## Rebuild the installable package

```sh
cd PlaylistTogether.iinaplugin
/usr/bin/zip -X ../PlaylistTogether.iinaplgz Info.json main.js
```
