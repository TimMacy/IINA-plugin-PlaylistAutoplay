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
    // IINA can leave a stale native menu reference after switching windows.
    // Set checkmarks on fresh items instead of assigning to .selected.
    menu.removeAllItems();
    const togetherItem = menu.item("Autoplay and Playlist Loop", () => setTogether(!enabled), { selected: enabled });
    const autoplayItem = menu.item("Play Next Item Automatically", () => {
        setAutoplay(!autoplayEnabled());
        updateMenu();
    }, { selected: autoplayEnabled() });
    const playlistLoopItem = menu.item("Playlist Loop", () => {
        setPlaylistLoop(!playlistLoopEnabled());
        updateMenu();
    }, { selected: playlistLoopEnabled() });

    menu.addItem(togetherItem);
    menu.addItem(menu.separator());
    menu.addItem(autoplayItem);
    menu.addItem(playlistLoopItem);
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

event.on("iina.file-loaded", () => {
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