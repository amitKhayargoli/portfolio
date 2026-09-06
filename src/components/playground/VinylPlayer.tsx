"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause } from "lucide-react";
import { music } from "@/data/music";

interface SpotifyEmbedController {
  loadUri: (uri: string) => void;
  addListener: (
    event: string,
    cb: (e: { data: SpotifyPlaybackData }) => void,
  ) => void;
  destroy?: () => void;
}

interface SpotifyPlaybackData {
  isPaused: boolean;
  isBuffering: boolean;
  duration: number;
  position: number;
  playingURI: string;
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri?: string; height?: number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
}

declare global {
  interface Window {
    SpotifyIframeApi?: SpotifyIframeApi;
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

/** "https://open.spotify.com/embed/track/ID" -> "spotify:track:ID" */
function toSpotifyUri(url: string): string {
  const match = url.match(
    /open\.spotify\.com\/(?:embed\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/,
  );
  return match ? `spotify:${match[1]}:${match[2]}` : url;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// ~33 RPM, as nature intended
const SPIN_SECONDS = 1.8;

/**
 * Hidden easter egg: a vinyl disc pinned near the footer. Clicking it
 * opens a turntable-style player that streams Spotify embeds from
 * src/data/music.ts. The record spins (and the tonearm drops) only
 * while audio is actually playing, via Spotify's iFrame API events.
 */
export function VinylPlayer() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const embedContainerRef = useRef<HTMLDivElement>(null);

  const spinning = playing && activeIndex !== null;

  // Load the Spotify iFrame API once, create a controller for the selected
  // track. The embed element is managed imperatively (the API replaces the
  // mount node with an iframe, which conflicts with React's reconciler).
  useEffect(() => {
    if (activeIndex === null) return;

    let controller: SpotifyEmbedController | null = null;
    let cancelled = false;
    setPlaying(false);
    setPosition(0);
    setDuration(0);

    const createEmbed = (api: SpotifyIframeApi) => {
      const container = embedContainerRef.current;
      if (!container || cancelled) return;

      // Fresh mount node each time - the API swaps it for an iframe
      const mount = document.createElement("div");
      container.replaceChildren(mount);

      api.createController(
        mount,
        {
          uri: toSpotifyUri(music[activeIndex].embedUrl),
          height: music[activeIndex].height ?? 152,
        },
        (embedController) => {
          if (cancelled) {
            embedController.destroy?.();
            return;
          }
          controller = embedController;
          embedController.addListener("playback_update", (e) => {
            setPlaying(!e.data.isPaused);
            setPosition(e.data.position);
            setDuration(e.data.duration);
          });
        },
      );
    };

    if (window.SpotifyIframeApi) {
      createEmbed(window.SpotifyIframeApi);
    } else {
      // Load the API script once; also guard against <script> already
      // being in flight from a previous effect run.
      window.onSpotifyIframeApiReady = (api) => {
        if (!cancelled) createEmbed(api);
      };
      if (!document.querySelector('script[src*="embed/iframe-api"]')) {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      controller?.destroy?.();
      controller = null;
      embedContainerRef.current?.replaceChildren();
    };
  }, [activeIndex]);

  // Close on Escape (playback continues in the background)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const progress =
    activeIndex !== null && duration > 0 ? position / duration : 0;

  return (
    <>
      {/* ===== Vinyl disc trigger ===== */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close music player" : "Open music player"}
        title="Music I like"
        className="fixed bottom-5 right-5 z-40 block h-16 w-16 rounded-full transition-transform duration-200 hover:scale-105"
      >
        {/* Progress ring (doesn't spin) */}
        <svg
          className="absolute -inset-1 h-[4.5rem] w-[4.5rem] -rotate-90"
          viewBox="0 0 72 72"
          fill="none"
        >
          <circle cx="36" cy="36" r="34" stroke="transparent" strokeWidth="2" />
          <circle
            cx="36"
            cy="36"
            r="34"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 34}
            strokeDashoffset={2 * Math.PI * 34 * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>

        {/* The record (spins while playing) - framer-motion rotation,
            immune to prefers-reduced-motion killing CSS animations */}
        <motion.span
          className="absolute inset-0 rounded-full shadow-lg ring-1 ring-white/10"
          animate={{ rotate: spinning ? 360 : 0 }}
          transition={{
            repeat: spinning ? Infinity : 0,
            ease: "linear",
            duration: SPIN_SECONDS,
          }}
          style={{
            background: [
              // Soft sheen wedge spanning label -> rim: rotating this reads
              // as the whole disc turning, not a dot orbiting
              "conic-gradient(from 20deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.09) 14deg, transparent 30deg)",
              "repeating-radial-gradient(circle at center, #1b1b20 0px, #1b1b20 2px, #0d0d10 3px, #0d0d10 5px)",
              "#0d0d10",
            ].join(", "),
          }}
        >
          {/* Center label - album color dot + spindle hole */}
          <span className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-accent" />
          <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-[#0d0d10]" />
        </motion.span>
      </button>

      {/* ===== Player panel ===== */}
      <AnimatePresence>
        {(open || activeIndex !== null) && (
          <motion.div
            className="fixed bottom-[5.5rem] right-5 z-40 w-[26rem] max-w-[calc(100vw-2.5rem)] max-h-[80vh] overflow-y-auto scrollbar-hidden rounded-2xl border border-border bg-card shadow-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{
              opacity: open ? 1 : 0,
              y: open ? 0 : 16,
              scale: open ? 1 : 0.96,
              pointerEvents: open ? "auto" : "none",
            }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* ===== Turntable: record offset left, tonearm pivots at its edge ===== */}
            <div className="relative mx-4 mt-4 h-44 rounded-xl bg-background/70 border border-border overflow-hidden">
              {/* Grooves - centered on the platter (96px, 88px).
                  SVG circles render smoothly (no gradient aliasing),
                  one every 35px like the old repeating gradient. */}
              <svg
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {Array.from({ length: 8 }, (_, i) => 34 + i * 35).map((r) => (
                  <circle
                    key={r}
                    cx={96}
                    cy={88}
                    r={r}
                    fill="none"
                    stroke="rgba(140,140,150,0.25)"
                    strokeWidth={1}
                  />
                ))}
              </svg>

              {/* Record - platter sits left like a real turntable.
                  z-0 keeps it below the tonearm (z-10) so the needle
                  always rides on top of the grooves. */}
              <div className="absolute left-6 top-1/2 z-0 h-36 w-36 -translate-y-1/2">
                <motion.div
                  className="absolute inset-0 rounded-full ring-1 ring-white/10"
                  animate={{ rotate: spinning ? 360 : 0 }}
                  transition={{
                    repeat: spinning ? Infinity : 0,
                    ease: "linear",
                    duration: SPIN_SECONDS,
                  }}
                  style={{
                    background: [
                      // Sheen wedge spanning label -> rim
                      "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.09) 14deg, transparent 30deg)",
                      "repeating-radial-gradient(circle at center, #1b1b20 0px, #1b1b20 2px, #0d0d10 3px, #0d0d10 5px)",
                      "#0d0d10",
                    ].join(", "),
                  }}
                >
                  {/* Center label - album color dot + spindle hole */}
                  <span className="absolute inset-0 m-auto h-11 w-11 rounded-full bg-accent" />
                  <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[#0d0d10]" />
                </motion.div>
              </div>

              {/* Tonearm - rotates about its pivot, arm hangs from it.
                  Pivot sits just off the record's right edge; the tip
                  lands over the grooves when playing. */}
              <div className="absolute left-[188px] top-6 z-20">
                <motion.div
                  className="relative w-[3px] origin-top"
                  initial={{ rotate: -4 }}
                  animate={{ rotate: spinning ? 35 : -4 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  {/* Counterweight */}
                  <div className="absolute -top-5 left-1/2 h-5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-500" />
                  {/* Arm - fixed metallic tones so the needle stays visible
                      against the dark vinyl in both themes */}
                  <div className="h-[88px] w-[3px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400" />
                  {/* Headshell at the tip */}
                  <div className="absolute -left-[3px] bottom-0 h-3.5 w-2.5 rounded-[2px] bg-zinc-300 ring-1 ring-black/40" />
                  {/* Pivot base */}
                  <div className="absolute -left-[6.5px] -top-[6.5px] h-4 w-4 rounded-full border-2 border-zinc-400 bg-background" />
                </motion.div>
              </div>

              {/* Paused overlay hint */}
              {activeIndex !== null && !playing && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] text-muted">
                  <Pause size={10} />
                  Paused
                </div>
              )}
            </div>

            {/* ===== Now playing bar ===== */}
            <div className="mx-4 mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Equalizer bars when playing */}
                <span className="flex h-3.5 w-4 items-end gap-[2px]">
                  {spinning ? (
                    [0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="eq-bar h-full w-[3px] rounded-sm bg-accent"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
                  )}
                </span>
                <p className="truncate text-xs font-medium text-foreground">
                  {activeIndex !== null
                    ? `${music[activeIndex].title} - ${music[activeIndex].artist}`
                    : "Nothing playing"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {activeIndex !== null && (
                  <span className="font-mono text-[10px] text-muted tabular-nums">
                    {formatTime(position)} / {formatTime(duration)}
                  </span>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close player"
                  className="p-1 text-muted hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ===== Track list ===== */}
            <div className="px-2 pt-2 pb-1">
              {music.map((track, i) => {
                const active = activeIndex === i;
                return (
                  <button
                    key={track.embedUrl}
                    onClick={() => {
                      if (active) {
                        setPlaying(false);
                        setActiveIndex(null);
                      } else {
                        setActiveIndex(i);
                      }
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${
                      active
                        ? "bg-background/60 text-foreground"
                        : "text-muted hover:bg-background/40 hover:text-foreground"
                    }`}
                  >
                    {/* Track number / playing indicator */}
                    <span className="w-4 shrink-0 text-center font-mono text-[10px] text-muted">
                      {active ? (
                        spinning ? (
                          <Play size={10} className="mx-auto text-accent" />
                        ) : (
                          <Pause size={10} className="mx-auto text-accent/60" />
                        )
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium">
                        {track.title}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {track.artist}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ===== Spotify embed ===== */}
            <div className="px-4 pb-4">
              <div
                ref={embedContainerRef}
                style={{
                  minHeight:
                    (activeIndex !== null ? music[activeIndex]?.height : 152) ??
                    152,
                }}
              />
              {activeIndex === null && (
                <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-border">
                  <p className="text-xs text-muted">
                    Pick a track to drop the needle
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
