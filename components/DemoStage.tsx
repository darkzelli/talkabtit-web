"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AvatarGlyph } from "./Customize";
import { VIDEO_SOURCES, POSTER, DEMO_DURATION, EPISODE, EP_LABEL } from "./demoClip";
import { Play, Pause, Skip, Vol, Pip, Fs, Dots, Heart } from "./playerIcons";
import "./demo.css";

/* ------------------------------------------------------------------ model */

type Tier = "plus" | "pro";
type Glyph = "crown" | "flag" | "popcorn";

type Comment = {
  id: string;
  ts: number; // the moment in the episode this comment is pinned to
  name: string;
  color: string;
  tier?: Tier;
  pic?: string; // Plus/Pro profile pic
  glyph?: Glyph; // otherwise a bundled avatar glyph
  avBg?: string;
  body: string; // may carry a trailing "[gif] <url>" marker line
  likes: number;
  likedByMe?: boolean;
  spoiler?: boolean;
  parentId?: string | null; // thread root (replies flatten onto the root)
  replyToName?: string; // set when answering another reply
  isFirst?: boolean; // "☆ started the conversation"
  mine?: boolean;
  deleted?: boolean;
  seq: number; // post order — what "Newest" sorts on
};

const SEED_COMMENTS: Comment[] = [
  { id: "c1", seq: 1, ts: 1, name: "ozani", color: "#FFB91F", tier: "pro", pic: "/gif-avatar.webp", body: "first watch, going in blind. spoiler-tag anything past this point 🙏", likes: 24, isFirst: true },
  { id: "c2", seq: 2, ts: 2, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "here we go 🍿", likes: 9 },
  { id: "c3", seq: 3, ts: 4, name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "ok the title card alone has me", likes: 6 },
  { id: "c4", seq: 4, ts: 5, name: "tobi", color: "#22D3EE", glyph: "crown", avBg: "#12303A", body: "who else is watching this the second it dropped", likes: 13 },
  { id: "c5", seq: 5, ts: 8, name: "mika_j", color: "#C084FC", tier: "plus", pic: "/still-avatar.webp", body: "the grade on this cold open is unreal", likes: 11 },
  { id: "c6", seq: 6, ts: 10, name: "sil", color: "#FB923C", glyph: "popcorn", avBg: "#3A2A16", body: "that first shot 😳", likes: 7 },
  { id: "c7", seq: 7, ts: 13, name: "renn", color: "#6EE7A0", glyph: "flag", avBg: "#1E3A2F", body: "wait — is that the same street from the trailer?", likes: 4 },
  { id: "c8", seq: 8, ts: 16, parentId: "c7", name: "ozani", color: "#FFB91F", tier: "pro", pic: "/gif-avatar.webp", body: "@renn yeah, and they come back to it at the end", likes: 9 },
  { id: "c9", seq: 9, ts: 19, parentId: "c7", replyToName: "ozani", name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "@ozani ok that is a REALLY good catch", likes: 3 },
  { id: "c10", seq: 10, ts: 22, name: "tobi", color: "#22D3EE", glyph: "crown", avBg: "#12303A", body: "the sound design in this hallway 🔥", likes: 8 },
  { id: "c11", seq: 11, ts: 26, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "whoever scored this scene deserves everything", likes: 17 },
  { id: "c12", seq: 12, ts: 30, name: "mika_j", color: "#C084FC", tier: "plus", pic: "/still-avatar.webp", body: "me every time the music swells\n[gif] /homer.webp", likes: 31 },
  { id: "c13", seq: 13, ts: 35, name: "sil", color: "#FB923C", glyph: "popcorn", avBg: "#3A2A16", body: "he is absolutely lying and nobody in this room can tell", likes: 6 },
  { id: "c14", seq: 14, ts: 40, name: "renn", color: "#6EE7A0", glyph: "flag", avBg: "#1E3A2F", body: "the way she reacts here pays off so hard later on, trust", likes: 12, spoiler: true },
  { id: "c15", seq: 15, ts: 46, name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "not him fixing his collar mid-lie 💀", likes: 10 },
  { id: "c16", seq: 16, ts: 52, name: "tobi", color: "#22D3EE", glyph: "crown", avBg: "#12303A", body: "rewound this twice already", likes: 8 },
  { id: "c17", seq: 17, ts: 58, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "this is the shot from the poster right?", likes: 5 },
  { id: "c18", seq: 18, ts: 64, name: "ozani", color: "#FFB91F", tier: "pro", pic: "/gif-avatar.webp", body: "the framing here. everyone on one side of the table except him", likes: 21 },
  { id: "c19", seq: 19, ts: 68, parentId: "c18", name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "@ozani never noticed until you said it, now I can’t unsee it", likes: 5 },
  { id: "c20", seq: 20, ts: 74, name: "mika_j", color: "#C084FC", tier: "plus", pic: "/still-avatar.webp", body: "the lighting shift when she walks in 👀", likes: 9 },
  { id: "c21", seq: 21, ts: 81, name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "not the door slam 😭", likes: 14 },
  { id: "c22", seq: 22, ts: 88, name: "sil", color: "#FB923C", glyph: "popcorn", avBg: "#3A2A16", body: "ok this is the exact moment the episode turns", likes: 19 },
  { id: "c23", seq: 23, ts: 96, name: "renn", color: "#6EE7A0", glyph: "flag", avBg: "#1E3A2F", body: "called it\n[gif] /gifs/unbothered.webp", likes: 11 },
  { id: "c24", seq: 24, ts: 104, name: "tobi", color: "#22D3EE", glyph: "crown", avBg: "#12303A", body: "the reveal is that the letter was never sent — it has been in the drawer the whole time", likes: 7, spoiler: true },
  { id: "c25", seq: 25, ts: 113, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "I need a minute", likes: 12 },
  { id: "c26", seq: 26, ts: 122, name: "mika_j", color: "#C084FC", tier: "plus", pic: "/still-avatar.webp", body: "the silence after this line is doing more work than the line", likes: 26 },
  { id: "c27", seq: 27, ts: 133, name: "ozani", color: "#FFB91F", tier: "pro", pic: "/gif-avatar.webp", body: "this is the best scene in the episode and it is not close", likes: 18 },
  { id: "c28", seq: 28, ts: 145, name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "brb crying\n[gif] /gifs/on-the-floor.webp", likes: 15 },
  { id: "c29", seq: 29, ts: 158, name: "sil", color: "#FB923C", glyph: "popcorn", avBg: "#3A2A16", body: "she KNEW. she knew the whole time", likes: 9, spoiler: true },
  { id: "c30", seq: 30, ts: 172, name: "tobi", color: "#22D3EE", glyph: "crown", avBg: "#12303A", body: "the way the score drops out here", likes: 13 },
  { id: "c31", seq: 31, ts: 188, name: "renn", color: "#6EE7A0", glyph: "flag", avBg: "#1E3A2F", body: "watching this a week late and the comments are still here. this is the whole point", likes: 33 },
  { id: "c32", seq: 32, ts: 205, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "that look at the end of the hallway is going to live in my head", likes: 16 },
  { id: "c33", seq: 33, ts: 222, name: "mika_j", color: "#C084FC", tier: "plus", pic: "/still-avatar.webp", body: "rewatching this scene tomorrow with the sound way up", likes: 10 },
  { id: "c34", seq: 34, ts: 240, name: "dee_", color: "#F472B6", glyph: "popcorn", avBg: "#3A1E2F", body: "did anyone else catch the photo on the desk 👀", likes: 8 },
  { id: "c35", seq: 35, ts: 256, name: "ozani", color: "#FFB91F", tier: "pro", pic: "/gif-avatar.webp", body: "@dee_ yes. that is going to matter", likes: 6 },
  { id: "c36", seq: 36, ts: 272, name: "sil", color: "#FB923C", glyph: "popcorn", avBg: "#3A2A16", body: "one more scene and I am not emotionally ready", likes: 11 },
  { id: "c37", seq: 37, ts: 288, name: "kaz", color: "#60A5FA", glyph: "crown", avBg: "#16233A", body: "see you all in ep 2", likes: 10 },
];

// The demo account you post as.
const ME = { name: "you", color: "#7DD3FC", glyph: "popcorn" as Glyph, avBg: "#3A2412" };

const SORTS: Array<[Sort, string]> = [
  ["ts", "By time"],
  ["top", "Top"],
  ["new", "Newest"],
];
type Sort = "ts" | "top" | "new";

const POPUP_SECS_CHOICES = [5, 10, 20, 30];
const POPUP_KEEP = 20;
const SNAP_STOPS = [400, 540, 720, 980];
const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

// The GIF library. The shipped picker searches Klipy; this page is a static
// export with no network of its own, so it carries nine clips and searches
// them by keyword instead. They live in /public/gifs — run
// scripts/optimize-gifs.py to add or re-encode one.
const GIFS: Array<{ src: string; label: string; tags: string[] }> = [
  { src: "/gifs/no-no-no.webp", label: "No no no", tags: ["no", "nope", "stop", "dont", "refuse", "spoiler"] },
  { src: "/gifs/shocked.webp", label: "Shocked", tags: ["shocked", "shook", "wow", "omg", "stunned", "eyes", "dog"] },
  { src: "/gifs/cant-watch.webp", label: "Can't watch", tags: ["cant", "watch", "hide", "cover", "cringe", "nervous", "anime"] },
  { src: "/gifs/wow.webp", label: "Wow", tags: ["wow", "shocked", "speechless", "jaw", "stunned", "omg"] },
  { src: "/gifs/dying-laughing.webp", label: "Dying laughing", tags: ["laugh", "lol", "lmao", "funny", "dying", "dead"] },
  { src: "/gifs/unbothered.webp", label: "Unbothered", tags: ["unbothered", "deadpan", "whatever", "meh", "bored", "spoiler", "anime"] },
  { src: "/gifs/spit-take.webp", label: "Spit take", tags: ["spit", "take", "wait", "what", "choking", "shocked"] },
  { src: "/gifs/on-the-floor.webp", label: "On the floor", tags: ["floor", "omg", "dead", "dying", "collapse", "laugh"] },
  { src: "/gifs/hello-there.webp", label: "Hello there", tags: ["hello", "hi", "hey", "wave", "lizard", "cute"] },
];
const GIF_PAGE = 6; // how many the grid shows before "More GIFs"

const EMOJI: Array<[string, string[]]> = [
  ["Reactions", ["😂", "😭", "😱", "😮", "🥹", "😍", "🤯", "😳", "🫠", "😤", "🙃", "😬"]],
  ["Hype", ["🔥", "💀", "👏", "🙌", "💯", "⚡️", "🏆", "🎬", "🍿", "⭐️", "🚀", "❤️"]],
  ["Takes", ["🤔", "👀", "🧠", "📈", "📉", "🫡", "🤡", "🗿", "✅", "❌", "❓", "‼️"]],
];

/* ------------------------------------------------------------------ utils */

function fmtTs(s: number) {
  const n = Math.max(0, Math.floor(s || 0));
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const sec = String(n % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

// The extension appends "[gif] <url>" as a trailing marker line rather than
// adding a column; readers split it back off and render the image. Only
// same-origin paths render here — anything else stays visible text, same as
// the extension's host allowlist.
function splitGifBody(body: string) {
  const m = /\n?\[gif\]\s+(\S+)\s*$/.exec(body || "");
  if (!m || !m[1].startsWith("/")) return { text: body || "", gifUrl: null as string | null };
  return { text: body.slice(0, m.index).trim(), gifUrl: m[1] };
}

function withMentions(text: string) {
  return text.split(/(@[A-Za-z0-9_]+)/g).map((part, i) =>
    part.startsWith("@") ? (
      <span className="tbx-mention" key={i}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// dull wash of the author's colour behind a pop-up card — the app's PopupCard
function rgbaOf(hex: string, a: number) {
  const h = hex.replace("#", "");
  const v = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${a})`;
}

/* --------------------------------------------------------------- avatar */

function Avatar({ c, size = 32 }: { c: Comment; size?: number }) {
  if (c.deleted) return <div className="tbx-avatar tbx-avatar-deleted" style={{ width: size, height: size }} />;
  return (
    <div className="tbx-avatar" style={{ width: size, height: size, background: c.pic ? "transparent" : c.avBg || "#2A1410" }}>
      {c.pic ? (
        <img src={c.pic} alt="" loading="lazy" decoding="async" />
      ) : (
        <AvatarGlyph name={c.glyph || "popcorn"} size={Math.round(size * 0.58)} color="#fff" />
      )}
    </div>
  );
}

function TierBadge({ tier }: { tier?: Tier }) {
  if (tier === "pro") return <AvatarGlyph name="crown" size={14} color="#FFB91F" />;
  if (tier === "plus") return <AvatarGlyph name="popcorn" size={11} color="#FFB91F" />;
  return null;
}

/* ------------------------------------------------------------- thread rows */

type RowItem =
  | { kind: "row"; c: Comment; depth: number }
  | { kind: "toggle"; id: string; n: number; open: boolean };

function buildRows(comments: Comment[], sort: Sort, expanded: Set<string>, blocked: Set<string>): RowItem[] {
  const visible = comments.filter((c) => !blocked.has(c.name));
  const ids = new Set(visible.map((c) => c.id));
  const kids = new Map<string, Comment[]>();
  const roots: Comment[] = [];
  for (const c of visible) {
    // a reply whose root is gone (blocked author) stands on its own
    if (c.parentId && ids.has(c.parentId)) {
      const list = kids.get(c.parentId);
      if (list) list.push(c);
      else kids.set(c.parentId, [c]);
    } else {
      roots.push(c);
    }
  }
  const key = (c: Comment) => (sort === "top" ? -c.likes : sort === "new" ? -c.seq : c.ts);
  roots.sort((a, b) => key(a) - key(b) || a.ts - b.ts);

  const out: RowItem[] = [];
  for (const root of roots) {
    out.push({ kind: "row", c: root, depth: 0 });
    const replies = (kids.get(root.id) || []).sort((a, b) => a.ts - b.ts);
    if (!replies.length) continue;
    const open = expanded.has(root.id);
    out.push({ kind: "toggle", id: root.id, n: replies.length, open });
    if (open) for (const r of replies) out.push({ kind: "row", c: r, depth: r.replyToName ? 2 : 1 });
  }
  return out;
}

type RowHandlers = {
  onLike: (id: string) => void;
  onReply: (c: Comment) => void;
  onReveal: (id: string) => void;
  onSeek: (t: number) => void;
  onMenu: (id: string | null) => void;
  onReport: (c: Comment) => void;
  onBlock: (c: Comment) => void;
  onDelete: (c: Comment) => void;
  onToggleReplies: (id: string) => void;
};

const Row = memo(function Row({
  c,
  depth,
  revealed,
  menuOpen,
  h,
}: {
  c: Comment;
  depth: number;
  revealed: boolean;
  menuOpen: boolean;
  h: RowHandlers;
}) {
  const cls = [
    "tbx-row",
    depth > 0 ? "tbx-row-reply" : "",
    depth > 1 ? "tbx-row-reply-deep" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // author-deleted husk: holds its place so its replies stay anchored
  if (c.deleted) {
    return (
      <div className={cls}>
        <Avatar c={c} />
        <div className="tbx-row-main">
          <div className="tbx-body tbx-deleted">Comment deleted</div>
        </div>
      </div>
    );
  }

  const { text, gifUrl } = splitGifBody(c.body);
  const blurred = !!c.spoiler && !revealed;

  return (
    <div
      className={cls}
      onDoubleClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        if (!c.likedByMe) h.onLike(c.id);
      }}
    >
      <Avatar c={c} />
      <div className="tbx-row-main">
        <div className="tbx-row-head">
          <span className="tbx-name" style={{ color: c.color }}>
            {c.name}
          </span>
          <TierBadge tier={c.tier} />
          <button
            className="tbx-chip"
            title={`Jump to ${fmtTs(c.ts)}`}
            onClick={() => h.onSeek(c.ts)}
          >
            {fmtTs(c.ts)}
          </button>
          {c.isFirst && <span className="tbx-first-chip">☆ started the conversation</span>}
          {c.replyToName && <span className="tbx-reply-tag">↩ {c.replyToName}</span>}
        </div>
        {text && (
          <div
            className={`tbx-body${blurred ? " tbx-blur" : ""}`}
            title={blurred ? "Tap to reveal" : undefined}
            onClick={blurred ? () => h.onReveal(c.id) : undefined}
          >
            {withMentions(text)}
          </div>
        )}
        {gifUrl && (
          <div
            className={`tbx-gif${blurred ? " tbx-blur" : ""}`}
            title={blurred ? "Tap to reveal" : undefined}
            onClick={blurred ? () => h.onReveal(c.id) : undefined}
          >
            <img src={gifUrl} alt="" loading="lazy" decoding="async" />
          </div>
        )}
      </div>
      <div className="tbx-row-side">
        <button
          className={`tbx-like${c.likedByMe ? " liked" : ""}`}
          onClick={() => h.onLike(c.id)}
          aria-label={c.likedByMe ? "Unlike" : "Like"}
        >
          <Heart filled={c.likedByMe} />
          {c.likes}
        </button>
        <button className="tbx-reply-btn" title={`Reply to ${c.name}`} onClick={() => h.onReply(c)}>
          ↩
        </button>
        <button
          className="tbx-menu-btn"
          title="More"
          aria-label="More actions"
          onClick={(e) => {
            e.stopPropagation();
            h.onMenu(menuOpen ? null : c.id);
          }}
        >
          ⋯
        </button>
      </div>
      {menuOpen && (
        <div className="tbx-menu" onClick={(e) => e.stopPropagation()}>
          {c.mine ? (
            <button className="danger" onClick={() => h.onDelete(c)}>
              Delete comment…
            </button>
          ) : (
            <>
              <button onClick={() => h.onReport(c)}>Report…</button>
              <button onClick={() => h.onBlock(c)}>Block {c.name}</button>
            </>
          )}
        </div>
      )}
    </div>
  );
});

/* =========================================================================
   the stage
   ========================================================================= */

export default function DemoStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);

  /* ---- transport: the real <video> when the clip is there, a virtual clock
     otherwise. Everything downstream reads `time`/`paused` and never cares. */
  const [hasVideo, setHasVideo] = useState(true);
  const virtual = useRef({ t: 0, paused: true, last: 0 });
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(DEMO_DURATION);
  const [paused, setPaused] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const timeRef = useRef(0);
  const pausedRef = useRef(true);

  /* ---- player chrome */
  const [idle, setIdle] = useState(false);
  const [fs, setFs] = useState(false);
  const [pipOk, setPipOk] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- drawer */
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(true);
  const [panelW, setPanelW] = useState(400);
  const [dragging, setDragging] = useState(false);
  const [sort, setSort] = useState<Sort>("ts");
  const [popupsOn, setPopupsOn] = useState(true);
  const [popupSecs, setPopupSecs] = useState(10);
  // off by default, matching the extension (worker default: popupBgOn !== true)
  const [popupBg, setPopupBg] = useState(false);

  /* ---- thread */
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["c7"]));
  const [blocked, setBlocked] = useState<Set<string>>(() => new Set());
  const [menuId, setMenuId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string; mention: string | null } | null>(null);
  const [reporting, setReporting] = useState<Comment | null>(null);
  const [deleting, setDeleting] = useState<Comment | null>(null);
  const [draft, setDraft] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTab, setPickerTab] = useState<"gifs" | "emoji">("gifs");
  const [pickerH, setPickerH] = useState(210);
  const [gifQ, setGifQ] = useState("");
  const [gifAll, setGifAll] = useState(false);
  const [gifAttach, setGifAttach] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const seqRef = useRef(SEED_COMMENTS.length);

  /* ---- pop-up rail */
  type Card = { c: Comment; expiresAt: number; fadingAt?: number };
  const [cards, setCards] = useState<Card[]>([]);
  const shownRef = useRef<Set<string>>(new Set());
  const lastTRef = useRef<number | null>(null);
  const railHover = useRef(false);

  /* ---------------------------------------------------------- transport */

  const seek = useCallback(
    (t: number) => {
      const clamped = Math.max(0, Math.min(duration - 0.05, t));
      const v = videoRef.current;
      if (hasVideo && v) v.currentTime = clamped;
      else virtual.current.t = clamped;
      timeRef.current = clamped;
      setTime(clamped);
    },
    [duration, hasVideo]
  );

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (hasVideo && v) {
      if (v.paused) void v.play().catch(() => {});
      else v.pause();
    } else {
      const s = virtual.current;
      if (s.t >= DEMO_DURATION - 0.1) s.t = 0;
      s.paused = !s.paused;
      s.last = performance.now();
      setPaused(s.paused);
      pausedRef.current = s.paused;
    }
  }, [hasVideo]);

  // one clock, read every frame; state updates keep the chrome in sync
  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const v = videoRef.current;
      if (hasVideo && v && v.readyState > 0) {
        timeRef.current = v.currentTime;
        pausedRef.current = v.paused;
        setTime(v.currentTime);
        setPaused(v.paused);
        if (v.duration && isFinite(v.duration)) setDuration(v.duration);
        setBuffered(v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0);
      } else if (!hasVideo) {
        const s = virtual.current;
        if (!s.paused) {
          s.t = Math.min(DEMO_DURATION, s.t + ((now - s.last) / 1000) * rate);
          if (s.t >= DEMO_DURATION) s.paused = true;
        }
        s.last = now;
        timeRef.current = s.t;
        pausedRef.current = s.paused;
        setTime(s.t);
        setPaused(s.paused);
        setDuration(DEMO_DURATION);
        setBuffered(DEMO_DURATION);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasVideo, rate]);

  // no clip on disk (404, or a codec the browser refuses): fall through to the
  // virtual clock rather than showing a dead player
  // With <source> children the browser reports a missing file on the *last
  // source*, not the video element, so listen there too — otherwise the only
  // signal is the timeout, and the demo sits dark for seconds before starting.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const fail = () => setHasVideo(false);
    v.addEventListener("error", fail);
    const last = v.querySelector("source:last-of-type");
    last?.addEventListener("error", fail);
    if (v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
    const t = setTimeout(() => {
      if (v.readyState === 0) setHasVideo(false);
    }, 2500);
    return () => {
      v.removeEventListener("error", fail);
      last?.removeEventListener("error", fail);
      clearTimeout(t);
    };
  }, []);

  // start rolling as soon as the page opens. Browsers only allow unmuted
  // autoplay after a gesture, so a refused play() retries muted — the user can
  // unmute from the bar. The virtual clock has no such rule and just starts.
  useEffect(() => {
    if (!hasVideo) {
      const s = virtual.current;
      if (s.t >= DEMO_DURATION - 0.1) return;
      s.paused = false;
      s.last = performance.now();
      pausedRef.current = false;
      setPaused(false);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    // play() straight away — the browser starts the moment enough has buffered
    let cancelled = false;
    v.play().catch(() => {
      if (cancelled) return;
      setMuted(true);
      v.muted = true;
      void v.play().catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, [hasVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = muted || volume === 0;
    v.playbackRate = rate;
  }, [volume, muted, rate]);

  /* ------------------------------------------------------------- chrome */

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!pausedRef.current) setIdle(true);
    }, 2800);
  }, []);

  useEffect(() => {
    if (paused) setIdle(false);
  }, [paused]);

  useEffect(() => {
    setPipOk(!!document.pictureInPictureEnabled);
  }, []);

  useEffect(() => {
    const onFs = () => setFs(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFs = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void stage.requestFullscreen().catch(() => {});
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(
    () => () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  // Player hotkeys, scoped to the stage. Typing in the drawer must never reach
  // them — the real extension solves the same problem with a capture-phase
  // shield around its shadow root.
  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      const el = e.target as HTMLElement;
      const typing = !!el.closest(".tbx-drawer") || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if (e.key === "Escape") {
        if (menuId) setMenuId(null);
        else if (open) setOpen(false);
        return;
      }
      if (typing) return;
      const k = e.key.toLowerCase();
      const act: Record<string, () => void> = {
        " ": togglePlay,
        k: togglePlay,
        arrowleft: () => seek(timeRef.current - 5),
        j: () => seek(timeRef.current - 5),
        arrowright: () => seek(timeRef.current + 5),
        l: () => seek(timeRef.current + 5),
        arrowup: () => {
          setVolume((v) => Math.min(1, v + 0.1));
          setMuted(false);
        },
        arrowdown: () => setVolume((v) => Math.max(0, v - 0.1)),
        m: () => setMuted((m) => !m),
        f: toggleFs,
        c: () => setOpen((o) => !o),
      };
      const run = act[k];
      if (!run) return;
      e.preventDefault();
      wake();
      run();
    },
    [menuId, open, seek, toggleFs, togglePlay, wake]
  );

  /* -------------------------------------------------------- the scrubber */

  const barRef = useRef<HTMLDivElement>(null);
  const ratioAt = (clientX: number) => {
    const r = barRef.current?.getBoundingClientRect();
    if (!r || !r.width) return 0;
    return Math.max(0, Math.min(1, (clientX - r.left) / r.width));
  };
  const onBarDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    barRef.current?.setPointerCapture(e.pointerId);
    setScrubbing(true);
    seek(ratioAt(e.clientX) * duration);
  };
  const onBarMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = ratioAt(e.clientX);
    setHoverRatio(r);
    if (scrubbing) seek(r * duration);
  };
  const onBarUp = () => setScrubbing(false);

  /* ---------------------------------------------------------- the drawer */

  const stageW = () => stageRef.current?.clientWidth || 1000;
  const panelMax = useCallback(() => Math.max(240, Math.round(stageW() * 0.85)), []);
  const peekW = useCallback(() => Math.min(400, panelMax()), [panelMax]);
  const dismissW = useCallback(() => Math.min(300, Math.round(peekW() * 0.78)), [peekW]);

  useEffect(() => {
    const clamp = () => setPanelW((w) => Math.min(w, panelMax()));
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [panelMax]);

  // Pull the left edge to widen; release settles on the nearest snap stop, or
  // dismisses if it was pushed narrow. Same stops as the extension.
  const dragRef = useRef<{ x: number; w: number } | null>(null);
  const grabDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, w: panelW };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    e.preventDefault();
  };
  const grabMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const max = panelMax();
    setPanelW(Math.min(max, Math.max(Math.min(220, max), d.w + (d.x - e.clientX))));
  };
  const grabUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    setPanelW((w) => {
      const max = panelMax();
      if (w < dismissW()) {
        setOpen(false);
        return peekW();
      }
      const stops = [...SNAP_STOPS.map((s) => Math.min(s, max)), max];
      return stops.reduce((best, s) => (Math.abs(s - w) < Math.abs(best - w) ? s : best), stops[0]);
    });
  };

  useEffect(() => {
    setPanelW((w) => Math.min(w, panelMax()));
  }, [fs, panelMax]);

  // close a row menu on any outside click
  useEffect(() => {
    if (!menuId) return;
    const off = () => setMenuId(null);
    document.addEventListener("click", off);
    return () => document.removeEventListener("click", off);
  }, [menuId]);

  /* ------------------------------------------------------ thread actions */

  const handlers = useMemo<RowHandlers>(
    () => ({
      onLike: (id) =>
        setComments((cs) =>
          cs.map((c) =>
            c.id === id ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) } : c
          )
        ),
      onReply: (c) => {
        setReplyTo({ id: c.parentId || c.id, name: c.name, mention: c.parentId ? c.name : null });
        // unfold where the reply will land, or it posts behind a closed toggle
        setExpanded((s) => new Set(s).add(c.parentId || c.id));
        setDraft((d) => (c.parentId && !d.startsWith(`@${c.name}`) ? `@${c.name} ${d}` : d));
        setTimeout(() => inputRef.current?.focus(), 0);
      },
      onReveal: (id) => setRevealed((s) => new Set(s).add(id)),
      onSeek: (t) => seek(t),
      onMenu: (id) => setMenuId(id),
      onReport: (c) => {
        setMenuId(null);
        setReporting(c);
      },
      onBlock: (c) => {
        setMenuId(null);
        setBlocked((s) => new Set(s).add(c.name));
        setCards((cs) => cs.filter((card) => card.c.name !== c.name));
        flash(`Blocked ${c.name} — hidden on this device only.`);
      },
      onDelete: (c) => {
        setMenuId(null);
        setDeleting(c);
      },
      onToggleReplies: (id) =>
        setExpanded((s) => {
          const n = new Set(s);
          if (n.has(id)) n.delete(id);
          else n.add(id);
          return n;
        }),
    }),
    [flash, seek]
  );

  const confirmDelete = () => {
    const c = deleting;
    if (!c) return;
    setDeleting(null);
    setComments((cs) => {
      const hasReplies = cs.some((x) => x.parentId === c.id);
      // one that still anchors replies stays as a husk, so the thread keeps shape
      return hasReplies
        ? cs.map((x) => (x.id === c.id ? { ...x, deleted: true, body: "", likes: 0, likedByMe: false } : x))
        : cs.filter((x) => x.id !== c.id);
    });
    setCards((cs) => cs.filter((card) => card.c.id !== c.id));
    flash("Comment deleted.");
  };

  // local keyword search over the bundled tiles — same shape as the Klipy
  // search the extension runs, minus the round trip
  const gifHits = useMemo(() => {
    const q = gifQ.trim().toLowerCase();
    if (!q) return GIFS;
    return GIFS.filter(
      (g) => g.label.toLowerCase().includes(q) || g.tags.some((t) => t.includes(q))
    );
  }, [gifQ]);
  const gifShown = gifAll ? gifHits : gifHits.slice(0, GIF_PAGE);

  const attachGif = (src: string) => {
    setGifAttach(src);
    setPickerOpen(false);
    inputRef.current?.focus();
  };

  // drag the pill for a taller picker; both tabs share the height
  const dragPicker = (e: ReactPointerEvent) => {
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    const startY = e.clientY;
    const startH = pickerH;
    el.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) =>
      setPickerH(Math.max(150, Math.min(420, startH + (startY - ev.clientY))));
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  useEffect(() => {
    if (!pickerOpen) return;
    const clamp = () => {
      const c = composerRef.current;
      const d = drawerRef.current;
      if (!c || !d) return;
      const over = Math.ceil(c.getBoundingClientRect().bottom - d.getBoundingClientRect().bottom);
      if (over > 0) setPickerH((h) => Math.max(90, h - over));
    };
    const id = requestAnimationFrame(clamp);
    window.addEventListener("resize", clamp);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", clamp);
    };
  }, [pickerOpen, pickerTab, pickerH, gifAll, gifQ, gifAttach, replyTo, panelW]);

  const post = () => {
    const typed = draft.trim();
    if (!typed && !gifAttach) return;
    // the extension carries a GIF as a trailing marker line on the body, which
    // is exactly what splitGifBody reads back out
    const body = gifAttach ? `${typed}\n[gif] ${gifAttach}`.trim() : typed;
    const ts = Math.floor(timeRef.current);
    const id = `me-${Date.now()}`;
    seqRef.current += 1;
    const mine: Comment = {
      id,
      seq: seqRef.current,
      ts,
      name: ME.name,
      color: ME.color,
      glyph: ME.glyph,
      avBg: ME.avBg,
      body,
      likes: 0,
      spoiler,
      parentId: replyTo?.id ?? null,
      replyToName: replyTo?.mention ?? undefined,
      mine: true,
    };
    setComments((cs) => [...cs, mine]);
    // it is pinned to now, so it must not immediately pop up over the video
    shownRef.current.add(id);
    setDraft("");
    setSpoiler(false);
    setReplyTo(null);
    setGifAttach(null);
    setPickerOpen(false);
    setNote(`Posted at ${fmtTs(ts)} — rewind past it and it pops up over the video.`);
    setTimeout(() => setNote(""), 6000);
    if (inputRef.current) inputRef.current.style.height = "auto";
    setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-cid="${id}"]`);
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      else if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 80);
  };

  /* ------------------------------------------------- timed pop-up engine */

  // Straight port of the extension's popupTick: comments surface as their
  // moment goes by; a seek purges cards that do not belong at the new playhead
  // and re-arms the ones now ahead of it, so replaying a scene pops them again.
  const engine = useRef({ comments, popupsOn, blocked, popupSecs });
  engine.current = { comments, popupsOn, blocked, popupSecs };

  useEffect(() => {
    const tick = () => {
      if (document.hidden) return;
      const { comments: cs, popupsOn: on, blocked: bl, popupSecs: secs } = engine.current;
      const t = timeRef.current;
      const lastT = lastTRef.current;
      if (lastT != null && (t < lastT - 3 || t - lastT > 8)) {
        setCards((list) => list.filter((card) => Math.abs(card.c.ts - t) <= 3));
        if (t < lastT) for (const c of cs) if (c.ts > t + 2) shownRef.current.delete(c.id);
        lastTRef.current = t;
        return;
      }
      if (pausedRef.current || lastT == null) {
        lastTRef.current = t;
        return;
      }
      // toggled off: keep tracking the clock so switching back resumes from
      // "now" instead of dumping everything that went by
      if (!on) {
        lastTRef.current = t;
        return;
      }
      const due = cs.filter(
        (c) => c.ts > lastT && c.ts <= t && !c.deleted && !shownRef.current.has(c.id) && !bl.has(c.name)
      );
      if (due.length) {
        const batch = due.slice(0, 4); // a burst at one moment — the rail absorbs it
        for (const c of batch) shownRef.current.add(c.id);
        const expiresAt = Date.now() + secs * 1000;
        setCards((list) => {
          const kept = list.filter((card) => !batch.some((c) => c.id === card.c.id));
          return [...batch.map((c) => ({ c, expiresAt })).reverse(), ...kept].slice(0, POPUP_KEEP);
        });
      }
      lastTRef.current = t;
    };
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);

  // expiry sweep: cards linger for the chosen duration, longer while the
  // pointer is over the rail (mid-read), then slide off their edge
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setCards((list) => {
        let changed = false;
        const next: Card[] = [];
        for (const card of list) {
          if (card.fadingAt) {
            if (now - card.fadingAt > 650) changed = true;
            else next.push(card);
            continue;
          }
          if (now < card.expiresAt) {
            next.push(card);
            continue;
          }
          changed = true;
          if (railHover.current) next.push({ ...card, expiresAt: now + 3000 });
          else next.push({ ...card, fadingAt: now });
        }
        return changed ? next : list;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!popupsOn) setCards([]);
  }, [popupsOn]);

  /* ------------------------------------------------------------- render */

  const rows = useMemo(() => buildRows(comments, sort, expanded, blocked), [comments, sort, expanded, blocked]);
  const curSec = Math.floor(time);
  const pct = duration ? (time / duration) * 100 : 0;
  const volLevel = muted ? 0 : volume;
  const canPip = hasVideo && pipOk;
  const unread = comments.filter((c) => !c.deleted && !blocked.has(c.name)).length;

  return (
    <div
      ref={stageRef}
      className={`dm-stage${idle ? " dm-idle" : ""}${idle && !paused ? " dm-hide-cursor" : ""}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      onPointerDown={wake}
      onPointerLeave={() => !paused && setIdle(true)}
      aria-label="TalkAbtIT demo player"
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className="dm-video"
          playsInline
          preload="auto"
          poster={POSTER || undefined}
          muted={muted}
          onClick={togglePlay}
          onDoubleClick={toggleFs}
          onEnded={() => setPaused(true)}
        >
          {VIDEO_SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : (
        <div className="dm-fallback" onClick={togglePlay} onDoubleClick={toggleFs} />
      )}

      <div className="dm-shade" />

      <div className="dm-titlebar">
        <div className="dm-titles">
          <div className="dm-show">{EPISODE.series}</div>
          <div className="dm-ep">
            {EP_LABEL} · {EPISODE.title}
          </div>
        </div>
        <span className="dm-svc">{EPISODE.service}</span>
      </div>

      {paused && (
        <button className="dm-bigplay" onClick={togglePlay} aria-label="Play">
          <Play size={84} />
        </button>
      )}

      {/* ---------------- control bar ---------------- */}
      <div className="dm-controls">
        <div
          ref={barRef}
          className={`dm-bar${scrubbing ? " dm-scrubbing" : ""}`}
          onPointerDown={onBarDown}
          onPointerMove={onBarMove}
          onPointerUp={onBarUp}
          onPointerCancel={onBarUp}
          onPointerLeave={() => setHoverRatio(null)}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(time)}
          aria-valuetext={fmtTs(time)}
          tabIndex={-1}
        >
          <div className="dm-bar-track">
            <div className="dm-bar-buffered" style={{ width: `${duration ? (buffered / duration) * 100 : 0}%` }} />
            {hoverRatio !== null && <div className="dm-bar-hoverfill" style={{ width: `${hoverRatio * 100}%` }} />}
            <div className="dm-bar-fill" style={{ width: `${pct}%` }} />
            <div className="dm-bar-knob" style={{ left: `${pct}%` }} />
          </div>
          {hoverRatio !== null && (
            <div className="dm-bar-tip" style={{ left: `${hoverRatio * 100}%` }}>
              {fmtTs(hoverRatio * duration)}
            </div>
          )}
        </div>

        <div className="dm-row">
          <button className="dm-btn" onClick={togglePlay} aria-label={paused ? "Play" : "Pause"} title={paused ? "Play (k)" : "Pause (k)"}>
            {paused ? <Play /> : <Pause />}
          </button>
          <button className="dm-btn" onClick={() => seek(time - 5)} aria-label="Back 5 seconds" title="Back 5s (←)">
            <Skip dir="back" secs={5} />
          </button>
          <button className="dm-btn" onClick={() => seek(time + 5)} aria-label="Forward 5 seconds" title="Forward 5s (→)">
            <Skip dir="fwd" secs={5} />
          </button>

          <div className="dm-vol">
            <button
              className="dm-btn"
              onClick={() => setMuted((m) => !m)}
              aria-label={volLevel === 0 ? "Unmute" : "Mute"}
              title="Mute (m)"
            >
              <Vol level={volLevel} />
            </button>
            <div className="dm-vol-slider">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volLevel}
                aria-label="Volume"
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  setMuted(v === 0);
                }}
              />
            </div>
          </div>

          <span className="dm-time">
            {fmtTs(time)} <span>/ {fmtTs(duration)}</span>
          </span>

          <span className="dm-spacer" />

          {/* one overflow menu instead of a row of niche buttons */}
          <div className="dm-pop">
            <button
              className={`dm-btn${showMenu ? " dm-on" : ""}`}
              onClick={() => setShowMenu((m) => !m)}
              aria-label="More options"
              aria-expanded={showMenu}
              title="More options"
            >
              <Dots />
            </button>
            {showMenu && (
              <div className="dm-menu">
                <div className="dm-menu-title">Speed</div>
                {RATES.map((r) => (
                  <button
                    key={r}
                    className={r === rate ? "dm-sel" : undefined}
                    onClick={() => {
                      setRate(r);
                      setShowMenu(false);
                    }}
                  >
                    <span>{r === 1 ? "Normal" : `${r}×`}</span>
                    {r === rate && <span>✓</span>}
                  </button>
                ))}
                {canPip && (
                  <>
                    <div className="dm-menu-sep" />
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        void videoRef.current?.requestPictureInPicture().catch(() => {});
                      }}
                    >
                      <span>Picture in picture</span>
                      <Pip size={15} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="dm-btn" onClick={toggleFs} aria-label="Fullscreen" title="Fullscreen (f)">
            <Fs on={fs} />
          </button>
        </div>
      </div>

      {/* ---------------- the extension: edge button ---------------- */}
      {/* until it has been opened once, the button says what it is for — the
          whole demo hinges on people finding it */}
      {nudge && !open && (
        <span className="tbx-cta" aria-hidden="true">
          Click to open the comments
        </span>
      )}
      <button
        className={`tbx-player-btn${nudge && !open ? " tbx-nudge" : ""}`}
        title="Comments — talk about it"
        aria-label="Open the comment section"
        onClick={() => {
          setOpen((o) => !o);
          setNudge(false);
        }}
      >
        <img className="tbx-mark" src="/mark.svg" alt="" />
        {!open && unread > 0 && <span className="tbx-badge">{unread > 99 ? "99+" : unread}</span>}
      </button>

      {/* ---------------- the extension: drawer ---------------- */}
      <aside
        ref={drawerRef}
        className={`tbx-drawer${open ? " open" : ""}${dragging ? " tbx-dragging" : ""}`}
        style={{ width: panelW }}
        inert={!open}
      >
        <div
          className="tbx-grab-row"
          onPointerDown={grabDown}
          onPointerMove={grabMove}
          onPointerUp={grabUp}
          onPointerCancel={grabUp}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize the comment panel"
        >
          <div className="tbx-grab" />
        </div>

        <div className="tbx-head">
          <div className="tbx-head-top">
            <img className="tbx-logo" src="/logo.svg" alt="TalkAbtIT" />
            <button className="tbx-close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="tbx-site-name">{EPISODE.service}</div>
          <div className="tbx-ep-show">{EPISODE.series}</div>
          <div className="tbx-ep-title">
            {EP_LABEL} · {EPISODE.title}
          </div>
        </div>

        <div className="tbx-tabs">
          {SORTS.map(([key, label]) => (
            <button
              key={key}
              className={`tbx-tab${sort === key ? " active" : ""}`}
              onClick={() => {
                setSort(key);
                if (listRef.current) listRef.current.scrollTop = 0;
              }}
            >
              {label}
            </button>
          ))}
          <button
            className={`tbx-popup-toggle${popupsOn ? " on" : ""}`}
            onClick={() => setPopupsOn((p) => !p)}
            title="Timed comment pop-ups over the video — a Plus feature, unlocked here in the demo"
          >
            <span>Pop-ups</span>
            <span className="tbx-plus-tag">PLUS</span>
            <span className="tbx-mini-switch" />
          </button>
        </div>

        {popupsOn && (
          <div className="tbx-popup-secs">
            <span className="tbx-popup-secs-label">Pop-up duration</span>
            {POPUP_SECS_CHOICES.map((s) => (
              <button
                key={s}
                className={`tbx-popup-secs-chip${popupSecs === s ? " active" : ""}`}
                onClick={() => setPopupSecs(s)}
              >
                {s}s
              </button>
            ))}
            <button
              className={`tbx-popup-bg-toggle${popupBg ? " on" : ""}`}
              onClick={() => setPopupBg((b) => !b)}
              title="Show a background behind pop-ups"
            >
              <span>BG</span>
              <span className="tbx-mini-switch" />
            </button>
          </div>
        )}

        <div className="tbx-demo-note">
          <b>Sandbox.</b> Every control here is the real one, but the thread lives in this tab only —
          nothing is posted and nothing is saved.
        </div>

        <div className="tbx-list" ref={listRef}>
          {/* data-cid mirrors the extension's rows so a fresh post can be scrolled to */}
          <div>
            {rows.map((item) =>
              item.kind === "row" ? (
                <div key={`w-${item.c.id}`} data-cid={item.c.id}>
                  <Row
                    c={item.c}
                    depth={item.depth}
                    revealed={revealed.has(item.c.id)}
                    menuOpen={menuId === item.c.id}
                    h={handlers}
                  />
                </div>
              ) : (
                <button
                  key={`t-${item.id}`}
                  className={`tbx-thread-toggle${item.open ? " open" : ""}`}
                  onClick={() => handlers.onToggleReplies(item.id)}
                >
                  {item.open ? "▾ Hide replies" : `▸ ${item.n} ${item.n === 1 ? "reply" : "replies"}`}
                </button>
              )
            )}
            {!rows.length && <div className="tbx-empty">Nothing here yet — be the first to talk about it.</div>}
          </div>
        </div>

        {/* ---------------- composer ---------------- */}
        <div className="tbx-composer" ref={composerRef}>
          {replyTo && (
            <div className="tbx-replying">
              <span className="tbx-replying-label">Replying to {replyTo.name}</span>
              <button className="tbx-replying-cancel" onClick={() => setReplyTo(null)} aria-label="Cancel reply">
                ✕
              </button>
            </div>
          )}

          {/* "GIF attached ✕" strip, the twin of the replying strip above it */}
          {gifAttach && (
            <div className="tbx-gif-attach">
              <img className="tbx-gif-attach-thumb" src={gifAttach} alt="" />
              <span className="tbx-replying-label">GIF attached</span>
              <button
                className="tbx-replying-cancel"
                onClick={() => setGifAttach(null)}
                aria-label="Remove the GIF"
              >
                ✕
              </button>
            </div>
          )}

          {pickerOpen && (
            <div className="tbx-gif-picker">
              <div className="tbx-gif-drag" onPointerDown={dragPicker}>
                <div className="tbx-gif-drag-pill" />
              </div>

              <div className="tbx-gif-tabs">
                <button
                  className={`tbx-gif-tab${pickerTab === "gifs" ? " on" : ""}`}
                  onClick={() => setPickerTab("gifs")}
                >
                  GIFs
                </button>
                <button
                  className={`tbx-gif-tab${pickerTab === "emoji" ? " on" : ""}`}
                  onClick={() => setPickerTab("emoji")}
                >
                  Emoji
                </button>
              </div>

              {pickerTab === "gifs" ? (
                <div>
                  <div className="tbx-gif-search-row">
                    <input
                      type="text"
                      className="tbx-gif-search"
                      placeholder="Search GIFs…"
                      maxLength={80}
                      value={gifQ}
                      onChange={(e) => {
                        setGifQ(e.target.value);
                        setGifAll(false);
                      }}
                    />
                    {/* the shipped picker searches Klipy; these nine ship with
                        the page so the demo needs no network */}
                    <span className="tbx-gif-brand">Klipy in the extension</span>
                  </div>
                  {gifShown.length > 0 && (
                    <div className="tbx-gif-grid" style={{ maxHeight: pickerH }}>
                      {gifShown.map((g) => (
                        <button
                          key={g.src}
                          className="tbx-gif-cell"
                          title={g.label}
                          onClick={() => attachGif(g.src)}
                        >
                          <img
                            className="tbx-gif-cell-img"
                            src={g.src}
                            alt={g.label}
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                  {!gifHits.length && (
                    <div className="tbx-gif-status">
                      Nothing for “{gifQ.trim()}”. Try “spoiler”, “cry” or “rewind”.
                    </div>
                  )}
                  {gifHits.length > gifShown.length && (
                    <button className="tbx-gif-more" onClick={() => setGifAll(true)}>
                      More GIFs
                    </button>
                  )}
                </div>
              ) : (
                <div className="tbx-emoji-pane" style={{ maxHeight: pickerH }}>
                  {EMOJI.map(([cat, list]) => (
                    <div key={cat}>
                      <div className="tbx-emoji-cat">{cat}</div>
                      <div className="tbx-emoji-grid">
                        {list.map((e) => (
                          <button
                            key={e}
                            className="tbx-emoji-cell"
                            onClick={() => {
                              setDraft((d) => d + e);
                              inputRef.current?.focus();
                            }}
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="tbx-compose-row">
            <span className="tbx-ts-chip" title="Your comment pins to this moment">
              {fmtTs(curSec)}
            </span>
            <textarea
              ref={inputRef}
              className="tbx-input"
              rows={1}
              maxLength={2000}
              placeholder="Say something…"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                const el = e.target;
                el.style.height = "auto";
                el.style.height = `${Math.min(96, el.scrollHeight)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  post();
                }
              }}
            />
            <button
              className={`tbx-gif-btn${pickerOpen ? " on" : ""}`}
              onClick={() => setPickerOpen((o) => !o)}
              title="Add a GIF or emoji"
              aria-pressed={pickerOpen}
            >
              GIF
            </button>
            <button
              className={`tbx-spoiler-btn${spoiler ? " on" : ""}`}
              onClick={() => setSpoiler((s) => !s)}
              title="Tag as spoiler (readers see it blurred)"
              aria-pressed={spoiler}
            >
              !
            </button>
            <button
              className="tbx-send"
              onClick={post}
              disabled={!draft.trim() && !gifAttach}
              title="Post"
              aria-label="Post"
            >
              ➤
            </button>
          </div>
          {note && <div className="tbx-compose-note">{note}</div>}
        </div>

        {/* ---------------- report sheet ---------------- */}
        {reporting && (
          <div className="tbx-sheet-scrim" onClick={() => setReporting(null)}>
            <div className="tbx-sheet" onClick={(e) => e.stopPropagation()}>
              <h3>Report {reporting.name}’s comment</h3>
              <select defaultValue="spoiler" aria-label="Reason">
                <option value="spoiler">Unmarked spoiler</option>
                <option value="harassment">Harassment</option>
                <option value="hate">Hate speech</option>
                <option value="spam">Spam</option>
                <option value="other">Something else</option>
              </select>
              <textarea placeholder="Anything else we should know? (optional)" />
              <p className="tbx-note">
                Reports are reviewed by a person. You can also block someone — their comments stay
                hidden on this device.
              </p>
              <div className="tbx-sheet-actions">
                <button className="tbx-btn tbx-btn-ghost" onClick={() => setReporting(null)}>
                  Cancel
                </button>
                <button
                  className="tbx-btn tbx-btn-primary"
                  onClick={() => {
                    setReporting(null);
                    flash("Thanks — reported.");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- delete confirm ---------------- */}
        {deleting && (
          <div className="tbx-sheet-scrim" onClick={() => setDeleting(null)}>
            <div className="tbx-sheet" onClick={(e) => e.stopPropagation()}>
              <h3>Delete your comment?</h3>
              <p className="tbx-note">
                This can’t be undone. If anyone replied to it, the row stays as a “Comment deleted”
                placeholder so the thread keeps its shape.
              </p>
              <div className="tbx-sheet-actions">
                <button className="tbx-btn tbx-btn-ghost" onClick={() => setDeleting(null)}>
                  Keep it
                </button>
                <button className="tbx-btn tbx-btn-primary" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ---------------- the extension: timed pop-ups ---------------- */}
      <div
        className={`tbx-popups${popupBg ? "" : " tbx-nobg"}`}
        onPointerEnter={() => (railHover.current = true)}
        onPointerLeave={() => (railHover.current = false)}
        aria-live="polite"
      >
        {cards.map((card) => {
          const c = card.c;
          const { text, gifUrl } = splitGifBody(c.body);
          const blurred = !!c.spoiler && !revealed.has(c.id);
          const wash = rgbaOf(c.color, 0.16);
          return (
            <div
              key={c.id}
              className={`tbx-popup${card.fadingAt ? " tbx-fade" : ""}`}
              style={
                popupBg
                  ? { background: `linear-gradient(${wash}, ${wash}), rgba(18, 19, 25, 0.82)`, borderColor: rgbaOf(c.color, 0.45) }
                  : undefined
              }
            >
              <div className="tbx-popup-name">
                <span style={{ color: c.color }}>{c.name}</span>
                <TierBadge tier={c.tier} />
                <span className="tbx-chip">{fmtTs(c.ts)}</span>
              </div>
              {text && (
                <div
                  className={`tbx-popup-body${blurred ? " tbx-blur" : ""}`}
                  title={blurred ? "Tap to reveal" : undefined}
                  onClick={blurred ? () => setRevealed((s) => new Set(s).add(c.id)) : undefined}
                >
                  {withMentions(text)}
                </div>
              )}
              {gifUrl && (
                <div
                  className={`tbx-gif tbx-gif-popup${blurred ? " tbx-blur" : ""}`}
                  onClick={blurred ? () => setRevealed((s) => new Set(s).add(c.id)) : undefined}
                >
                  <img src={gifUrl} alt="" loading="lazy" decoding="async" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {toast && <div className="dm-toast">{toast}</div>}
    </div>
  );
}
