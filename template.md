# Ethical Crypto Article Design System

This template defines the professional design components used in the Ethical Crypto platform. All components use **Tailwind CSS** and should be wrapped in a `<div class="not-prose">` container to avoid conflicts with the global typography styles.

---

## 1. Hero / Introduction Card
Use this at the very beginning of the article to provide context and high-level metrics.

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
            <!-- Add more rows as needed -->
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
    <div class="bg-black text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
        <div class="relative z-10 space-y-4">
            <p class="leading-relaxed opacity-80 italic">
                "[Key quote or simplified definition...]"
            </p>
            <p class="leading-relaxed">
                [Detailed explanation...]
            </p>
        </div>
        <!-- Optional SVG Background Pattern -->
        <div class="absolute -right-20 -bottom-20 opacity-10">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
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
            <li class="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span class="text-sm font-black uppercase tracking-widest text-zinc-600">[ITEM 1]</span>
            </li>
            <!-- Add more items -->
        </ul>
    </div>
    <!-- Add Category 2 in the same format -->
</div>
```

---

## 5. FAQ Grid
Use this at the end of the article for frequently asked questions.

```html
<div class="not-prose space-y-8 pt-12 border-t border-zinc-100">
    <h3 class="text-2xl font-black uppercase tracking-tighter text-center">Frequently Asked Questions</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white border border-zinc-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <h4 class="font-black text-black uppercase tracking-tighter text-lg mb-4">[QUESTION?]</h4>
            <p class="text-zinc-500 text-sm leading-relaxed mt-auto">
                [ANSWER...]
            </p>
        </div>
        <!-- Add more FAQ items -->
    </div>
</div>
```

---

## General Design Rules
1.  **Colors**: Stick to `zinc-50`, `zinc-100`, `zinc-200`, `zinc-400`, `black`, and `white`.
2.  **Typography**: Use `uppercase` and `tracking-tighter` for headings. Use `tracking-widest` and `font-black` for small labels.
3.  **Spacing**: Use `space-y-12` between major sections and `mb-12` for individual blocks.
4.  **Borders**: Use `rounded-[2rem]` or `rounded-3xl` for a premium, softened look.
5.  **Interactivity**: Use `hover:shadow-md` or `hover:border-zinc-200` for interactive elements.
