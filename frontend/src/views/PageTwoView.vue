<template>
  <main class="page-two">
    <section class="theme-picker">
      <button
        v-for="color in themeColors"
        :key="color.value"
        type="button"
        class="theme-dot"
        :class="{ active: currentThemeColor === color.value }"
        :style="{ background: color.value }"
        :aria-label="`set theme ${color.label}`"
        @click="setTheme(color.value)"
      ></button>
    </section>

    <header class="hero">
      <SentenceBanner text="Show me your tastes" />
    </header>

    <section class="search-area">
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        placeholder="搜索单曲、专辑、音乐人..."
      />
      <button class="search-btn" type="button" @click="keyword = keyword.trim()">搜索</button>
    </section>

    <section v-if="searchResults.length" class="search-result-list">
      <button
        v-for="item in searchResults"
        :key="`result-${item.title}`"
        type="button"
        class="search-result-item"
        @click="addAlbum(item)"
      >
        <span>{{ item.title }}</span>
        <span class="result-sub">{{ item.artist }}</span>
      </button>
    </section>

    <section class="card-grid top-grid" :style="topGridStyle">
      <SongCard
        v-for="item in topCards"
        :key="item.title + item.artist"
        :title="item.title"
        :artist="item.artist"
        :year="item.year"
        :cover="item.cover"
        :from-color="item.fromColor"
        :to-color="item.toColor"
      />
    </section>

    <section v-if="overflowCards.length" class="overflow-wrap">
      <section class="card-grid overflow-grid">
        <SongCard
          v-for="item in pagedOverflowCards"
          :key="`overflow-${item.title}-${item.year}`"
          :title="item.title"
          :artist="item.artist"
          :year="item.year"
          :cover="item.cover"
          :from-color="item.fromColor"
          :to-color="item.toColor"
        />
      </section>

      <div class="pager">
        <button type="button" class="pager-btn" :disabled="overflowPage === 1" @click="overflowPage--">
          上一页
        </button>
        <span class="pager-info">{{ overflowPage }} / {{ overflowPageCount }}</span>
        <button
          type="button"
          class="pager-btn"
          :disabled="overflowPage === overflowPageCount"
          @click="overflowPage++"
        >
          下一页
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import SentenceBanner from "../components/ui/SentenceBanner.vue";
import SongCard from "../components/ui/SongCard.vue";

const keyword = ref("");
const overflowPage = ref(1);
const overflowPageSize = 6;
const currentThemeColor = ref("rgb(249 210 210)");

type AlbumItem = {
  fileName: string;
  title: string;
  artist: string;
  year: string;
  fromColor: string;
  toColor: string;
};

const themeColors = [
  { label: "soft pink", value: "rgb(249 210 210)" },
  { label: "warm gray", value: "rgb(227 217 209)" },
  { label: "mint", value: "rgb(205 229 216)" },
  { label: "light blue", value: "rgb(203 221 239)" },
  { label: "lavender", value: "rgb(219 210 236)" }
];

const albumLibrary: AlbumItem[] = [
  {
    fileName: "album-2.jpg",
    title: "IGOR",
    artist: "Tyler, The Creator",
    year: "2019",
    fromColor: "rgb(212 144 175)",
    toColor: "rgb(104 74 86)"
  },
  {
    fileName: "album-1.jpg",
    title: "Ants From Up Three",
    artist: "Aimer",
    year: "2023",
    fromColor: "rgb(102 119 161)",
    toColor: "rgb(56 68 98)"
  },
  {
    fileName: "album-3.jpg",
    title: "Life Continues....",
    artist: "The New Horizon",
    year: "2021",
    fromColor: "rgb(184 143 112)",
    toColor: "rgb(88 62 50)"
  },
  {
    fileName: "album-4.jpg",
    title: "未命名专辑",
    artist: "Unknown Artist",
    year: "2024",
    fromColor: "rgb(128 126 153)",
    toColor: "rgb(72 70 90)"
  },
  {
    fileName: "album-1.jpg",
    title: "Mornings In Echo",
    artist: "Ari Vale",
    year: "2020",
    fromColor: "rgb(138 153 188)",
    toColor: "rgb(67 81 116)"
  },
  {
    fileName: "album-2.jpg",
    title: "Pink Static",
    artist: "NOVA",
    year: "2018",
    fromColor: "rgb(215 158 186)",
    toColor: "rgb(114 74 93)"
  },
  {
    fileName: "album-3.jpg",
    title: "Dust And Daylight",
    artist: "Harbor Lights",
    year: "2022",
    fromColor: "rgb(188 155 126)",
    toColor: "rgb(90 66 53)"
  },
  {
    fileName: "album-4.jpg",
    title: "Moon Archive",
    artist: "Irene Blue",
    year: "2025",
    fromColor: "rgb(141 138 169)",
    toColor: "rgb(74 72 95)"
  },
  {
    fileName: "album-1.jpg",
    title: "Ants Revisited",
    artist: "Aimer",
    year: "2024",
    fromColor: "rgb(122 140 183)",
    toColor: "rgb(63 77 110)"
  },
  {
    fileName: "album-2.jpg",
    title: "Cherry Noir",
    artist: "Tyler, The Creator",
    year: "2020",
    fromColor: "rgb(198 141 167)",
    toColor: "rgb(106 72 84)"
  },
  {
    fileName: "album-3.jpg",
    title: "Oceans Continue",
    artist: "The New Horizon",
    year: "2023",
    fromColor: "rgb(168 130 102)",
    toColor: "rgb(82 58 45)"
  },
  {
    fileName: "album-4.jpg",
    title: "Unnamed Dreams",
    artist: "Unknown Artist",
    year: "2026",
    fromColor: "rgb(132 130 157)",
    toColor: "rgb(68 66 88)"
  },
  {
    fileName: "album-1.jpg",
    title: "Skyline Draft",
    artist: "Aimer",
    year: "2022",
    fromColor: "rgb(130 146 176)",
    toColor: "rgb(62 78 108)"
  },
  {
    fileName: "album-2.jpg",
    title: "Iris Engine",
    artist: "NOVA",
    year: "2021",
    fromColor: "rgb(201 145 172)",
    toColor: "rgb(103 69 83)"
  },
  {
    fileName: "DAWN.-Kendrick Lamar.jpg",
    title: "DAWN.",
    artist: "Kendrick Lamar",
    year: "2024",
    fromColor: "rgb(132 103 83)",
    toColor: "rgb(67 53 44)"
  },
  {
    fileName: "Gemini Rights-Steve Lacy.jpg",
    title: "Gemini Rights",
    artist: "Steve Lacy",
    year: "2022",
    fromColor: "rgb(168 144 121)",
    toColor: "rgb(83 72 58)"
  },
  {
    fileName: "In the Aeroplane Over the Sea-Neutral Milk Hotel.jpg",
    title: "In the Aeroplane Over the Sea",
    artist: "Neutral Milk Hotel",
    year: "1998",
    fromColor: "rgb(184 166 122)",
    toColor: "rgb(95 83 59)"
  },
  {
    fileName: "Never-Nirvana.jpg",
    title: "Never",
    artist: "Nirvana",
    year: "1991",
    fromColor: "rgb(144 133 120)",
    toColor: "rgb(72 66 59)"
  },
  {
    fileName: "Young Fresh Chin II-夏之禹.jpg",
    title: "Young Fresh Chin II",
    artist: "夏之禹",
    year: "2021",
    fromColor: "rgb(143 129 115)",
    toColor: "rgb(70 63 57)"
  },
  {
    fileName: "人人都爱嘻哈乐-夏之禹&地磁卡.png",
    title: "人人都爱嘻哈乐",
    artist: "夏之禹&地磁卡",
    year: "2022",
    fromColor: "rgb(124 146 170)",
    toColor: "rgb(62 74 87)"
  },
  {
    fileName: "只爱陌生人-王菲.jpg",
    title: "只爱陌生人",
    artist: "王菲",
    year: "1999",
    fromColor: "rgb(155 153 166)",
    toColor: "rgb(78 76 89)"
  },
  {
    fileName: "回到未来-方大同.jpg",
    title: "回到未来",
    artist: "方大同",
    year: "2012",
    fromColor: "rgb(185 157 127)",
    toColor: "rgb(93 78 61)"
  },
  {
    fileName: "红旗下的蛋-崔健.jpg",
    title: "红旗下的蛋",
    artist: "崔健",
    year: "1994",
    fromColor: "rgb(184 84 76)",
    toColor: "rgb(92 44 40)"
  }
];

const toViewModel = (album: AlbumItem) => ({
  ...album,
  cover: `/${encodeURIComponent(album.fileName)}`
});

const selectedAlbums = ref(
  albumLibrary.slice(0, 4).map((album) => ({
    ...toViewModel(album)
  }))
);

const searchResults = computed(() => {
  const q = keyword.value.trim().toLowerCase();
  if (!q) return [];
  const selectedTitleSet = new Set(selectedAlbums.value.map((a) => a.title));
  return albumLibrary
    .filter((a) => !selectedTitleSet.has(a.title))
    .filter((a) => `${a.title}${a.artist}`.toLowerCase().includes(q))
    .slice(0, 8)
    .map(toViewModel);
});

const addAlbum = (album: ReturnType<typeof toViewModel>) => {
  if (selectedAlbums.value.some((item) => item.title === album.title)) return;
  selectedAlbums.value.push(album);
  keyword.value = "";
};

const topCards = computed(() => selectedAlbums.value.slice(0, 10));
const overflowCards = computed(() => selectedAlbums.value.slice(10));

const overflowPageCount = computed(() => Math.max(1, Math.ceil(overflowCards.value.length / overflowPageSize)));
const pagedOverflowCards = computed(() => {
  const start = (overflowPage.value - 1) * overflowPageSize;
  return overflowCards.value.slice(start, start + overflowPageSize);
});

watchEffect(() => {
  if (overflowPage.value > overflowPageCount.value) overflowPage.value = overflowPageCount.value;
});

const topGridStyle = computed(() => {
  const count = topCards.value.length;
  let columns = 1;
  if (count <= 1) columns = 1;
  else if (count <= 4) columns = 2;
  else if (count <= 9) columns = 3;
  else columns = 5;

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 248px))`,
    justifyContent: "center"
  };
});

const setTheme = (color: string) => {
  currentThemeColor.value = color;
  document.documentElement.style.setProperty("--app-bg-color", color);
};
</script>

<style scoped>
.page-two {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 40px;
}

.theme-picker {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.35);
  backdrop-filter: blur(6px);
}

.theme-dot {
  width: 18px;
  height: 18px;
  border: 1px solid rgb(255 255 255 / 0.6);
  border-radius: 999px;
  cursor: pointer;
}

.theme-dot.active {
  outline: 2px solid rgb(67 52 52 / 0.7);
}

.hero {
  margin-bottom: 26px;
}

.search-area {
  margin: 0 auto 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.search-input {
  width: min(600px, 75vw);
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.11);
  color: #fff;
  outline: none;
  padding: 12px 16px;
}

.search-input::placeholder {
  color: #f0dada;
}

.search-btn {
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 999px;
  padding: 12px 18px;
  color: #fff;
  cursor: pointer;
  background: rgb(255 255 255 / 0.11);
}

.search-btn:hover {
  background: rgb(255 255 255 / 0.2);
}

.search-result-list {
  max-width: 760px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.search-result-item {
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: 10px;
  background: rgb(255 255 255 / 0.14);
  color: #fff;
  cursor: pointer;
  text-align: left;
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.search-result-item:hover {
  background: rgb(255 255 255 / 0.22);
}

.result-sub {
  color: rgb(255 255 255 / 0.7);
  font-size: 12px;
}

.card-grid {
  display: grid;
  gap: 22px;
}

.top-grid {
  justify-items: center;
}

.overflow-wrap {
  margin-top: 20px;
}

.overflow-grid {
  grid-template-columns: repeat(auto-fit, minmax(248px, 248px));
  justify-content: center;
  justify-items: center;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pager-btn {
  border: 1px solid rgb(255 255 255 / 0.25);
  background: rgb(255 255 255 / 0.12);
  color: #fff;
  border-radius: 999px;
  padding: 8px 14px;
  cursor: pointer;
}

.pager-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pager-info {
  color: rgb(255 255 255 / 0.88);
}

@media (max-width: 760px) {
  .search-result-list {
    grid-template-columns: 1fr;
  }
}
</style>
