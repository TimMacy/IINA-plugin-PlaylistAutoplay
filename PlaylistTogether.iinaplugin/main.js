const { event, menu, mpv, preferences } = iina;

let enabled = preferences.get("enabled") === true;
let initialized = false;
let autoplayKeepOpen = "yes";

function autoplayEnabled() {
    return mpv.getString("keep-open") !== "always";
}

function playlistLoopEnabled() {
    const value = mpv.getString("loop-playlist");
    return value === "inf" || value === "force" || Number(value) > 0;
}

function rememberKeepOpen() {
    const value = mpv.getString("keep-open");
    if (value === "yes" || value === "no") autoplayKeepOpen = value;
}

function setAutoplay(value) {
    rememberKeepOpen();
    mpv.set("keep-open", value ? autoplayKeepOpen : "always");
}

function setPlaylistLoop(value) {
    // File looping takes precedence over playlist looping in mpv.
    if (value) mpv.set("loop-file", "no");
    mpv.set("loop-playlist", value ? "inf" : "no");
}

function updateMenu() {
    togetherItem.selected = enabled;
    autoplayItem.selected = autoplayEnabled();
    playlistLoopItem.selected = playlistLoopEnabled();
    // The first player is still being created when this script loads.
    if (initialized) menu.forceUpdate();
}

function setTogether(value) {
    enabled = value;
    setAutoplay(value);
    setPlaylistLoop(value);
    preferences.set("enabled", enabled);
    preferences.sync();
    updateMenu();
}

const togetherItem = menu.item("Autoplay and Playlist Loop", () => setTogether(!enabled));
const autoplayItem = menu.item("Play Next Item Automatically", () => {
    setAutoplay(!autoplayEnabled());
    updateMenu();
});
const playlistLoopItem = menu.item("Playlist Loop", () => {
    setPlaylistLoop(!playlistLoopEnabled());
    updateMenu();
});

menu.addItem(togetherItem);
menu.addItem(menu.separator());
menu.addItem(autoplayItem);
menu.addItem(playlistLoopItem);

event.on("iina.file-loaded", () => {
    // Apply once per player, after IINA initializes its playback options.
    // Later file loads must not undo individual changes.
    if (!initialized) {
        initialized = true;
        enabled = preferences.get("enabled") === true;
        setAutoplay(enabled);
        setPlaylistLoop(enabled);
    }
    updateMenu();
});

event.on("mpv.keep-open.changed", updateMenu);
event.on("mpv.loop-playlist.changed", updateMenu);

updateMenu();
