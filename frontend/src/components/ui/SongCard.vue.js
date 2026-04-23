import { computed } from "vue";
const props = defineProps();
const cardStyle = computed(() => ({
    background: `linear-gradient(145deg, ${props.fromColor}, ${props.toColor})`
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['arrow-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card card-shadow" },
    ...{ style: (__VLS_ctx.cardStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card-bg" },
    ...{ style: (__VLS_ctx.cardStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card-bg-inner" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ class: "cover-image" },
    src: (__VLS_ctx.cover),
    alt: (__VLS_ctx.title),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-card-meta" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "song-title" },
});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "song-artist" },
});
(__VLS_ctx.artist);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-year" },
});
(__VLS_ctx.year);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "song-side" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "arrow-btn" },
    type: "button",
    'aria-label': "add song",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 12 12",
    ...{ class: "arrow-icon" },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z",
});
/** @type {__VLS_StyleScopedClasses['song-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['song-card-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['song-card-bg-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['song-card-center']} */ ;
/** @type {__VLS_StyleScopedClasses['cover-image']} */ ;
/** @type {__VLS_StyleScopedClasses['song-card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['song-card-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['song-title']} */ ;
/** @type {__VLS_StyleScopedClasses['song-artist']} */ ;
/** @type {__VLS_StyleScopedClasses['song-year']} */ ;
/** @type {__VLS_StyleScopedClasses['song-side']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cardStyle: cardStyle,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SongCard.vue.js.map