import { For, createSignal } from "solid-js";
import { locale, setLocale, locales, tt } from "./i18n";

type ProjectKey = "distillery" | "yeogi" | "gorani" | "subway" | "poke10";

const projects: { name: ProjectKey; emoji: string; url: string }[] = [
  { name: "distillery", emoji: "🥃", url: "https://distillery.chito.dev" },
  { name: "yeogi", emoji: "🗺️", url: "https://yeogi.chito.dev" },
  { name: "gorani", emoji: "🎨", url: "https://gorani.chito.dev" },
  { name: "subway", emoji: "🚇", url: "https://subway.chito.dev" },
  { name: "poke10", emoji: "⚡", url: "https://poke10.chito.dev" },
];

function Item(props: { name: ProjectKey; emoji: string; url: string; i: number }) {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="item" style={{ "--i": props.i }}>
      <button class="row" onClick={() => setOpen(!open())}>
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
            <a href="https://github.com/Coreight98" target="_blank" rel="noopener noreferrer">github.com/Coreight98</a>
          </div>
        </div>
      </div>
    </>
  );
}
