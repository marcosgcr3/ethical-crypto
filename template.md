# Ethical Crypto Article Design System

This template defines the professional design components used in the Ethical Crypto platform. All components use **Tailwind CSS** and should be wrapped in a `<div class="not-prose">` container to avoid conflicts with the global typography styles.

---

## 1. Hero / Introduction Cards

### Option A: Metric Hero Card
Best for technical articles with key metrics (e.g., Total Staked, Price, APR).

```html
<div class="not-prose bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 mb-12">
    <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="flex-1 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                ANALYSIS 2026
            </div>
            <h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">[ARTICLE TITLE]</h2>
            <p class="text-zinc-600 leading-relaxed font-medium">
                [Brief executive summary or introduction text...]
            </p>
        </div>
        <div class="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div class="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
                <div class="text-2xl font-black text-black">[METRIC 1]</div>
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest">[LABEL 1]</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
                <div class="text-2xl font-black text-zinc-500">[METRIC 2]</div>
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest">[LABEL 2]</div>
            </div>
        </div>
    </div>
</div>
```

### Option B: Editorial Quote Intro
Best for opinion pieces, comparisons, or high-impact editorial reports.

```html
<div class="not-prose mb-16 relative py-12 px-6 text-center max-w-4xl mx-auto border-y border-zinc-100">
    <svg class="absolute top-4 left-4 w-12 h-12 text-zinc-100 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L22.017 3V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91243 8 2.017 7.10457 2.017 6V3L10.017 3V15C10.017 18.3137 7.33072 21 4.017 21H2.017Z" />
    </svg>
    <div class="space-y-6 relative z-10">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-lg mx-auto">
            NETWORK REPORT
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-black">
            [TITLE A] vs <span class="text-zinc-300 font-serif lowercase italic">[TITLE B]</span>
        </h2>
        <p class="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed italic max-w-2xl mx-auto">
            "[Impactful quote or summary sentence...]"
        </p>
        <div class="flex items-center justify-center gap-8 pt-4">
            <div class="text-center">
                <div class="text-xs font-black uppercase tracking-widest text-zinc-300 mb-1">[LABEL 1]</div>
                <div class="text-sm font-bold uppercase">[VALUE 1]</div>
            </div>
            <div class="w-px h-8 bg-zinc-100"></div>
            <div class="text-center">
                <div class="text-xs font-black uppercase tracking-widest text-zinc-300 mb-1">[LABEL 2]</div>
                <div class="text-sm font-bold uppercase">[VALUE 2]</div>
            </div>
        </div>
    </div>
</div>
```

---

## 2. Professional Data Tables
Use these for comparing technical specifications or market data.

```html
<div class="not-prose overflow-x-auto mb-12">
    <table class="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
        <thead>
            <tr class="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                <th class="px-6 py-4 text-left">Feature</th>
                <th class="px-6 py-4 text-left">[OPTION A]</th>
                <th class="px-6 py-4 text-left">[OPTION B]</th>
            </tr>
        </thead>
        <tbody class="text-sm font-medium">
            <tr class="border-b border-zinc-50">
                <td class="px-6 py-4 font-black uppercase text-zinc-400">[LABEL]</td>
                <td class="px-6 py-4">[DATA A]</td>
                <td class="px-6 py-4">[DATA B]</td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## 3. Highlight / Callout Blocks
Use these for important explanations or definitions.

```html
<div class="not-prose space-y-6 mb-12">
    <h3 class="text-2xl font-black uppercase tracking-tighter border-l-4 border-black pl-4">[SECTION TITLE]</h3>
    <div class="bg-black text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
        <div class="relative z-10 space-y-4">
            <p class="leading-relaxed opacity-60 italic text-lg md:text-xl border-l-2 border-white/20 pl-6">
                "[Key quote or simplified definition...]"
            </p>
            <p class="leading-relaxed opacity-90">
                [Detailed explanation...]
            </p>
        </div>
        <div class="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        </div>
    </div>
</div>
```

---

## 4. Use Case / Feature Comparison Grid
Use these for listing specific applications or benefits.

```html
<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-12 py-8 mb-12">
    <div class="space-y-6">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-black text-xl italic text-black">[ICON]</div>
            <h4 class="text-xl font-black uppercase tracking-tighter">[CATEGORY 1]</h4>
        </div>
        <ul class="space-y-3">
            <li class="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white transition-colors">
                <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-600">[ITEM 1]</span>
            </li>
        </ul>
    </div>
</div>
```

---

## 5. FAQ Grid
Use this at the end of the article for frequently asked questions.

```html
<div class="not-prose space-y-8 pt-12 border-t border-zinc-100">
    <h3 class="text-2xl font-black uppercase tracking-tighter text-center">Frequently Asked Questions</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex flex-col hover:bg-white transition-all">
            <h4 class="font-black text-black uppercase tracking-tighter text-sm mb-4">[QUESTION?]</h4>
            <p class="text-zinc-500 text-[13px] leading-relaxed mt-auto">
                [ANSWER...]
            </p>
        </div>
    </div>
</div>
```

---

## General Design Rules
1.  **Colors**: Stick to `zinc-50`, `zinc-100`, `zinc-200`, `zinc-400`, `black`, and `white`.
2.  **Typography**: Use `uppercase` and `tracking-tighter` for headings. Use `tracking-widest` and `font-black` for small labels.
3.  **Spacing**: Use `space-y-12` or `space-y-16` between major sections.
4.  **Borders**: Use `rounded-[2rem]` or `rounded-[3rem]` for containers.
5.  **Classes**: Always wrap in `<div class="not-prose">`.
