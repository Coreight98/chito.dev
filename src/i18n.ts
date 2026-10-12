import { createSignal, createEffect } from "solid-js";

export type Locale = "ko" | "en" | "zh" | "ja";

const labels: Record<Locale, string> = { ko: "한", en: "EN", zh: "中", ja: "日" };
export const locales = Object.entries(labels) as [Locale, string][];

const t = {
  ko: {
    title: "플레이그라운드",
    desc: "사이드 프로젝트 모음",
    projects: {
      distillery: "증류소 맞추기 스무고개",
      yeogi: "한국 지리 퀴즈",
      gorani: "고라니 심리 테스트",
      subway: "한국 지하철 맞추기",
      poke10: "포켓몬 10고개",
    },
  },
  en: {
    title: "Playground",
    desc: "A collection of side projects",
    projects: {
      distillery: "Guess the distillery in 20 questions",
      yeogi: "Korean geography quiz",
      gorani: "Gorani personality test",
      subway: "Guess the Korean subway station",
      poke10: "Pokémon 10 questions",
    },
  },
  zh: {
    title: "游乐场",
    desc: "副项目合集",
    projects: {
      distillery: "蒸馏所20问答竞猜",
      yeogi: "韩国地理问答",
      gorani: "水鹿心理测试",
      subway: "猜韩国地铁站",
      poke10: "口袋妖怪10问",
    },
  },
  ja: {
    title: "プレイグラウンド",
    desc: "サイドプロジェクト集",
    projects: {
      distillery: "蒸留所当てクイズ 20問",
      yeogi: "韓国地理クイズ",
      gorani: "コラニ性格テスト",
      subway: "韓国地下鉄クイズ",
      poke10: "ポケモン10問クイズ",
    },
  },
} as const;

function detect(): Locale {
  const lang = navigator.language.slice(0, 2);
  if (lang in t) return lang as Locale;
  return "ko";
}

const [locale, setLocale] = createSignal<Locale>(detect());

createEffect(() => {
  const l = locale();
  const tr = t[l];
  document.documentElement.lang = l;
  document.title = tr.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", tr.desc);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", tr.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", tr.desc);
});

export { locale, setLocale };
export const tt = () => t[locale()];
