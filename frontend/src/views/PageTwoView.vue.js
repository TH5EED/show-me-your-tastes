import { computed, ref, watchEffect } from "vue";
import SentenceBanner from "../components/ui/SentenceBanner.vue";
import SongCard from "../components/ui/SongCard.vue";
const keyword = ref("");
const overflowPage = ref(1);
const overflowPageSize = 6;
const currentThemeColor = ref("rgb(249 210 210)");
const themeColors = [
    { label: "soft pink", value: "rgb(249 210 210)" },
    { label: "warm gray", value: "rgb(227 217 209)" },
    { label: "mint", value: "rgb(205 229 216)" },
    { label: "light blue", value: "rgb(203 221 239)" },
    { label: "lavender", value: "rgb(219 210 236)" }
];
const albumLibrary = [
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
const toViewModel = (album) => ({
    ...album,
    cover: `/${encodeURIComponent(album.fileName)}`
});
const selectedAlbums = ref(albumLibrary.slice(0, 4).map((album) => ({
    ...toViewModel(album)
})));
const searchResults = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    if (!q)
        return [];
    const selectedTitleSet = new Set(selectedAlbums.value.map((a) => a.title));
    return albumLibrary
        .filter((a) => !selectedTitleSet.has(a.title))
        .filter((a) => `${a.title}${a.artist}`.toLowerCase().includes(q))
        .slice(0, 8)
        .map(toViewModel);
});
const addAlbum = (album) => {
    if (selectedAlbums.value.some((item) => item.title === album.title))
        return;
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
    if (overflowPage.value > overflowPageCount.value)
        overflowPage.value = overflowPageCount.value;
});
const topGridStyle = computed(() => {
    const count = topCards.value.length;
    let columns = 1;
    if (count <= 1)
        columns = 1;
    else if (count <= 4)
        columns = 2;
    else if (count <= 9)
        columns = 3;
    else
        columns = 5;
    return {
        gridTemplateColumns: `repeat(${columns}, minmax(0, 248px))`,
        justifyContent: "center"
    };
});
const setTheme = (color) => {
    currentThemeColor.value = color;
    document.documentElement.style.setProperty("--app-bg-color", color);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['theme-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pager-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-list']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "page-two" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "theme-picker" },
});
for (const [color] of __VLS_getVForSourceType((__VLS_ctx.themeColors))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setTheme(color.value);
            } },
        key: (color.value),
        type: "button",
        ...{ class: "theme-dot" },
        ...{ class: ({ active: __VLS_ctx.currentThemeColor === color.value }) },
        ...{ style: ({ background: color.value }) },
        'aria-label': (`set theme ${color.label}`),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "hero" },
});
/** @type {[typeof SentenceBanner, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SentenceBanner, new SentenceBanner({
    text: "Show me your tastes",
}));
const __VLS_1 = __VLS_0({
    text: "Show me your tastes",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "search-area" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.keyword),
    ...{ class: "search-input" },
    type: "text",
    placeholder: "搜索单曲、专辑、音乐人...",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.keyword = __VLS_ctx.keyword.trim();
        } },
    ...{ class: "search-btn" },
    type: "button",
});
if (__VLS_ctx.searchResults.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "search-result-list" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.searchResults))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.searchResults.length))
                        return;
                    __VLS_ctx.addAlbum(item);
                } },
            key: (`result-${item.title}`),
            type: "button",
            ...{ class: "search-result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (item.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "result-sub" },
        });
        (item.artist);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "card-grid top-grid" },
    ...{ style: (__VLS_ctx.topGridStyle) },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.topCards))) {
    /** @type {[typeof SongCard, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(SongCard, new SongCard({
        key: (item.title + item.artist),
        title: (item.title),
        artist: (item.artist),
        year: (item.year),
        cover: (item.cover),
        fromColor: (item.fromColor),
        toColor: (item.toColor),
    }));
    const __VLS_4 = __VLS_3({
        key: (item.title + item.artist),
        title: (item.title),
        artist: (item.artist),
        year: (item.year),
        cover: (item.cover),
        fromColor: (item.fromColor),
        toColor: (item.toColor),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.overflowCards.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "overflow-wrap" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "card-grid overflow-grid" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.pagedOverflowCards))) {
        /** @type {[typeof SongCard, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(SongCard, new SongCard({
            key: (`overflow-${item.title}-${item.year}`),
            title: (item.title),
            artist: (item.artist),
            year: (item.year),
            cover: (item.cover),
            fromColor: (item.fromColor),
            toColor: (item.toColor),
        }));
        const __VLS_7 = __VLS_6({
            key: (`overflow-${item.title}-${item.year}`),
            title: (item.title),
            artist: (item.artist),
            year: (item.year),
            cover: (item.cover),
            fromColor: (item.fromColor),
            toColor: (item.toColor),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pager" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.overflowCards.length))
                    return;
                __VLS_ctx.overflowPage--;
            } },
        type: "button",
        ...{ class: "pager-btn" },
        disabled: (__VLS_ctx.overflowPage === 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "pager-info" },
    });
    (__VLS_ctx.overflowPage);
    (__VLS_ctx.overflowPageCount);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.overflowCards.length))
                    return;
                __VLS_ctx.overflowPage++;
            } },
        type: "button",
        ...{ class: "pager-btn" },
        disabled: (__VLS_ctx.overflowPage === __VLS_ctx.overflowPageCount),
    });
}
/** @type {__VLS_StyleScopedClasses['page-two']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-picker']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['search-area']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-list']} */ ;
/** @type {__VLS_StyleScopedClasses['search-result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['card-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['top-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['card-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['pager']} */ ;
/** @type {__VLS_StyleScopedClasses['pager-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['pager-info']} */ ;
/** @type {__VLS_StyleScopedClasses['pager-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SentenceBanner: SentenceBanner,
            SongCard: SongCard,
            keyword: keyword,
            overflowPage: overflowPage,
            currentThemeColor: currentThemeColor,
            themeColors: themeColors,
            searchResults: searchResults,
            addAlbum: addAlbum,
            topCards: topCards,
            overflowCards: overflowCards,
            overflowPageCount: overflowPageCount,
            pagedOverflowCards: pagedOverflowCards,
            topGridStyle: topGridStyle,
            setTheme: setTheme,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=PageTwoView.vue.js.map