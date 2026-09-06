// Music shown in the hidden vinyl player (footer, bottom-right).
//
// How to add your own:
//   1. In Spotify: right-click a track or playlist -> Share -> Copy link
//      e.g. https://open.spotify.com/track/XXXX or .../playlist/XXXX
//   2. Paste the URL as embedUrl (the player converts it to a Spotify URI)
//   3. Add an entry below. Use height: 152 for tracks, 352 for playlists.

export interface MusicEntry {
  title: string;
  artist: string;
  embedUrl: string;
  /** iframe height in px — 152 for tracks, 352 for playlists */
  height?: number;
}

export const music: MusicEntry[] = [
  {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    embedUrl: "https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC",
    height: 152,
  },
  {
    title: "Something Stupid (From \"Better Call Saul\")",
    artist: "Lola Marsh",
    embedUrl: "https://open.spotify.com/track/29EdNlJQqStWhNkSGpkuFQ",
    height: 152,
  },
  {
    title: "Dusk Till Dawn (feat. Sia)",
    artist: "ZAYN",
    embedUrl: "https://open.spotify.com/track/5d5TCGriJlouzFLAufIqjk",
    height: 152,
  },
];
