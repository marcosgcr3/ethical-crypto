# Ethical Crypto Article Design System (V2 - Biohacking Inspired)

This template defines the professional design components used in the Ethical Crypto platform, inspired by the high-impact editorial style of Ethical Biohacking.

---

## 1. Hero / Introduction Card
Use this for a refined, high-impact editorial look. It focuses on a key quote and minimal metrics.

```html
<div class="not-prose mb-16 relative py-12 px-6 text-center max-w-4xl mx-auto border-y border-zinc-100">
    <!-- Editorial Quote Icon -->
    <svg class="absolute top-4 left-4 w-12 h-12 text-zinc-100 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L22.017 3V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91243 8 2.017 7.10457 2.017 6V3L10.017 3V15C10.017 18.3137 7.33072 21 4.017 21H2.017Z" />
    </svg>
    <div class="space-y-6 relative z-10">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-lg mx-auto">
            [CATEGORY TAG]
        </div>
        <p class="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed italic max-w-2xl mx-auto pt-4">
            "[Impactful quote or summary sentence...]"
        </p>
        <div class="flex items-center justify-center gap-8 pt-8">
            <div class="text-center">
                <div class="text-xs font-black uppercase tracking-widest text-zinc-300 mb-1">[LABEL 1]</div>
                <div class="text-sm font-bold uppercase text-black">[VALUE 1]</div>
            </div>
            <div class="w-px h-8 bg-zinc-100"></div>
            <div class="text-center">
                <div class="text-xs font-black uppercase tracking-widest text-zinc-300 mb-1">[LABEL 2]</div>
                <div class="text-sm font-bold uppercase text-black">[VALUE 2]</div>
            </div>
        </div>
    </div>
</div>
```

---

## 2. Professional Data Tables
Clean, modern tables with dark headers and rounded containers.

```html
<div class="not-prose overflow-x-auto rounded-2xl border border-zinc-100 mb-12 shadow-sm">
    <table class="w-full border-collapse">
        <thead class="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
                <th class="px-6 py-4 text-left">Feature</th>
                <th class="px-6 py-4 text-left">[OPTION A]</th>
                <th class="px-6 py-4 text-left">[OPTION B]</th>
            </tr>
        </thead>
        <tbody class="text-sm font-medium text-zinc-600">
            <tr class="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                <td class="px-6 py-4 font-black text-black uppercase tracking-tighter">[LABEL]</td>
                <td class="px-6 py-4">[DATA A]</td>
                <td class="px-6 py-4">[DATA B]</td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## 3. "Pro-Tip" / Insight Cards
Used for callouts, tips, or important sidebars. Inspired by the thick-border style of Ethical Biohacking.

```html
<div class="not-prose bg-zinc-50 border-l-4 border-black p-6 rounded-r-2xl my-12 group hover:bg-white hover:shadow-md transition-all">
    <div class="flex items-start gap-4">
        <div class="text-black font-black uppercase tracking-widest text-[10px] mt-1 shrink-0">INSIGHT</div>
        <div class="text-zinc-600 text-sm leading-relaxed">
            [Insert your pro-tip or important insight here...]
        </div>
    </div>
</div>
```

---

## 4. Feature Highlight Block
Dark high-impact blocks for core concepts.

```html
<div class="not-prose space-y-6 mb-16">
    <h3 class="text-2xl font-black uppercase tracking-tighter border-l-4 border-black pl-4">[SECTION TITLE]</h3>
    <div class="bg-black text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
        <div class="relative z-10 space-y-4">
            <p class="leading-relaxed opacity-60 italic text-lg md:text-xl border-l-2 border-white/20 pl-6">
                "[Key quote...]"
            </p>
            <p class="leading-relaxed opacity-90">
                [Detailed explanation...]
            </p>
        </div>
    </div>
</div>
```

---

## 5. FAQ Grid
Clean, minimalist cards for end-of-article questions.

```html
<div class="not-prose space-y-8 pt-12 border-t border-zinc-100">
    <h3 class="text-2xl font-black uppercase tracking-tighter text-center">Frequently Asked Questions</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex flex-col hover:bg-white hover:shadow-md transition-all">
            <h4 class="font-black text-black uppercase tracking-tighter text-sm mb-4">[QUESTION?]</h4>
            <p class="text-zinc-500 text-[13px] leading-relaxed mt-auto">[ANSWER]</p>
        </div>
    </div>
</div>
```
