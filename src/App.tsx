import { For, Show, createSignal } from "solid-js";
import { locale, setLocale, locales, tt } from "./i18n";

type ProjectKey = "distillery" | "yeogi" | "gorani" | "subway" | "poke10";

const projects: { name: ProjectKey; emoji: string; url: string }[] = [
  { name: "distillery", emoji: "🥃", url: "https://distillery.chito.dev" },
  { name: "yeogi", emoji: "🗺️", url: "https://yeogi.chito.dev" },
  { name: "gorani", emoji: "🎨", url: "https://gorani.chito.dev" },
  { name: "subway", emoji: "🚇", url: "https://subway.chito.dev" },
  { name: "poke10", emoji: "⚡", url: "https://poke10.chito.dev" },
];

const [preview, setPreview] = createSignal<{
  name: ProjectKey; emoji: string; url: string;
  x: number; y: number;
  rowLeft: number; rowTop: number; rowW: number; rowH: number;
} | null>(null);

let hoverTimer: number;

function showPreview(e: MouseEvent, proj: typeof projects[0]) {
  clearTimeout(hoverTimer);
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  hoverTimer = window.setTimeout(() => {
    setPreview({
      ...proj, x: rect.right + 8, y: rect.top + rect.height / 2,
      rowLeft: rect.left, rowTop: rect.top, rowW: rect.width, rowH: rect.height,
    });
  }, 300);
}

function hidePreview() {
  clearTimeout(hoverTimer);
  setPreview(null);
}

function Item(props: { name: ProjectKey; emoji: string; url: string; i: number }) {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="item" style={{ "--i": props.i }}>
      <button
        class="row"
        onClick={() => setOpen(!open())}
        onMouseEnter={(e) => showPreview(e, { name: props.name, emoji: props.emoji, url: props.url })}
        onMouseLeave={hidePreview}
      >
        <span class="chevron" classList={{ open: open() }}>›</span>
        <span class="emoji">{props.emoji}</span>
        <span class="name">{props.name}</span>
      </button>
      <div class="detail" classList={{ open: open() }}>
        <div class="detail-inner">
          <span class="desc">{tt().projects[props.name]}</span>
          <a href={props.url} target="_blank" rel="noopener noreferrer">{props.name}.chito.dev ↗</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <div class="lang">
        <For each={locales}>
          {([code, label]) => (
            <button classList={{ active: locale() === code }} onClick={() => setLocale(code)}>
              {label}
            </button>
          )}
        </For>
      </div>
      <div class="shell">
        <div class="bar">
          <span class="dot r" /><span class="dot y" /><span class="dot g" />
          <span class="title">~/playground</span>
        </div>
        <div class="body">
          <For each={projects}>
            {(p, i) => <Item {...p} i={i()} />}
          </For>
          <div class="footer">
            <a href="https://chito.dev/playground" target="_blank" rel="noopener noreferrer">made by chito.dev</a>
          </div>
        </div>
      </div>
      <Show when={preview()}>
        {(p) => {
          const x = () => p().x;
          const y = () => p().y;
          const url = () => p().url;
          return (
            <>
              <div class="goo-wrap">
                <div class="goo-dot" style={{ left: `${p().rowLeft + p().rowW - 20}px`, top: `${y()}px` }} />
                <div class="goo-card" style={{ left: `${x()}px`, top: `${y()}px` }} />
              </div>
              <div class="glass-content" style={{ left: `${x()}px`, top: `${y()}px` }}>
                <span class="glass-emoji">{p().emoji}</span>
                <span class="glass-name">{p().name}</span>
                <span class="glass-desc">{tt().projects[p().name]}</span>
                <a class="glass-link" href={url()} target="_blank" rel="noopener noreferrer">{p().name}.chito.dev ↗</a>
              </div>
            </>
          );
        }}
      </Show>
    </>
  );
}
